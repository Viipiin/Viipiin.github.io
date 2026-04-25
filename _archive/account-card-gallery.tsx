import { useCallback, useEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import {
    Body1,
    Button,
    Card,
    CardHeader,
    Image,
    Spinner,
    Text,
    makeStyles,
    mergeClasses,
    tokens,
} from "@fluentui/react-components";
import { OpenRegular } from "@fluentui/react-icons";
import type {
    ExtractFields,
    GeneratedComponentProps,
    QueryTableOptions,
} from "./RuntimeTypes";

type AccountCardRow = ExtractFields<
    "account",
    "accountid" | "name" | "entityimage" | "entityimage_url" | "websiteurl" | "emailaddress1" | "telephone1"
>;

type AccountQueryPage = {
    rows: AccountCardRow[];
    hasMoreRows: boolean;
    loadMoreRows?: () => Promise<AccountQueryPage>;
};

const ACCOUNT_COLUMNS = [
    "accountid",
    "name",
    "entityimage",
    "entityimage_url",
    "websiteurl",
    "emailaddress1",
    "telephone1",
] as const;

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        padding: tokens.spacingHorizontalL,
        gap: tokens.spacingVerticalM,
        backgroundColor: tokens.colorNeutralBackground1,
        "@media (max-width: 768px)": {
            padding: tokens.spacingHorizontalM,
        },
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: tokens.spacingHorizontalM,
        flexWrap: "wrap",
    },
    scrollRegion: {
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        paddingBottom: tokens.spacingVerticalM,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 320px))",
        justifyContent: "start",
        gap: tokens.spacingVerticalM,
        "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
        },
    },
    card: {
        width: "320px",
        minHeight: "360px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transitionProperty: "transform, box-shadow",
        transitionDuration: "0.15s",
        transitionTimingFunction: "ease",
        ":hover": {
            transform: "translateY(-2px)",
            boxShadow: tokens.shadow8,
        },
        ":focus-visible": {
            outlineStyle: "solid",
            outlineColor: tokens.colorBrandStroke1,
            outlineWidth: "2px",
            outlineOffset: "2px",
        },
        "@media (max-width: 768px)": {
            width: "100%",
        },
    },
    image: {
        width: "100%",
        height: "140px",
        objectFit: "cover",
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorNeutralBackground3,
    },
    imagePlaceholder: {
        width: "100%",
        height: "140px",
        borderRadius: tokens.borderRadiusMedium,
        backgroundColor: tokens.colorNeutralBackground3,
        color: tokens.colorNeutralForeground3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cardBody: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalXS,
        marginTop: tokens.spacingVerticalS,
    },
    title: {
        lineHeight: "1.4rem",
        minHeight: "5.6rem",
        maxHeight: "5.6rem",
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: "4",
        WebkitBoxOrient: "vertical",
        wordBreak: "break-word",
    },
    detailLabel: {
        color: tokens.colorNeutralForeground2,
        marginInlineEnd: tokens.spacingHorizontalXS,
    },
    detailValue: {
        color: tokens.colorNeutralForeground1,
        wordBreak: "break-word",
    },
    footer: {
        marginTop: "auto",
        paddingTop: tokens.spacingVerticalS,
        display: "flex",
        justifyContent: "flex-end",
    },
    message: {
        padding: tokens.spacingVerticalM,
        color: tokens.colorNeutralForeground2,
    },
    error: {
        color: tokens.colorPaletteRedForeground1,
    },
    actions: {
        display: "flex",
        justifyContent: "center",
        marginTop: tokens.spacingVerticalM,
    },
});

const toSafeText = (value: unknown): string => {
    return typeof value === "string" && value.trim().length > 0 ? value : "—";
};

const getImageSource = (row: AccountCardRow): string | undefined => {
    if (typeof row.entityimage_url === "string" && row.entityimage_url.trim().length > 0) {
        return row.entityimage_url;
    }

    if (typeof row.entityimage === "string" && row.entityimage.trim().length > 0) {
        return `data:image/png;base64,${row.entityimage}`;
    }

    return undefined;
};

const openAccountRecord = async (accountId: string): Promise<void> => {
    const targetUrl = `${window.location.origin}${window.location.pathname}?pagetype=entityrecord&etn=account&id=${encodeURIComponent(accountId)}`;
    window.open(targetUrl, "_blank");
};

type AccountCardProps = {
    row: AccountCardRow;
    onOpen: (accountId: string) => Promise<void>;
};

const AccountCard = ({ row, onOpen }: AccountCardProps) => {
    const styles = useStyles();
    const imageSrc = getImageSource(row);

    const handleClick = useCallback(async () => {
        await onOpen(row.accountid);
    }, [onOpen, row.accountid]);

    const handleKeyDown = useCallback(
        async (event: ReactKeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                await onOpen(row.accountid);
            }
        },
        [onOpen, row.accountid],
    );

    const handleOpenButtonClick = useCallback(
        async (event: ReactMouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            event.stopPropagation();
            await onOpen(row.accountid);
        },
        [onOpen, row.accountid],
    );

    return (
        <Card
            className={styles.card}
            tabIndex={0}
            role="button"
            aria-label={`Open account ${toSafeText(row.name)}`}
            onClick={() => {
                void handleClick();
            }}
            onKeyDown={(event) => {
                void handleKeyDown(event);
            }}
        >
            <CardHeader
                header={<Text weight="semibold">Account</Text>}
                description={<Text size={200}>Click to open in a new window</Text>}
            />
            {imageSrc ? (
                <Image className={styles.image} src={imageSrc} alt={`Image for ${toSafeText(row.name)}`} fit="cover" />
            ) : (
                <div className={styles.imagePlaceholder} aria-label="No account image available">
                    <Text size={200}>No account image available</Text>
                </div>
            )}
            <div className={styles.cardBody}>
                <Text className={styles.title} weight="semibold">
                    {toSafeText(row.name)}
                </Text>
                <Body1>
                    <span className={styles.detailLabel}>Website:</span>
                    <span className={styles.detailValue}>{toSafeText(row.websiteurl)}</span>
                </Body1>
                <Body1>
                    <span className={styles.detailLabel}>Email:</span>
                    <span className={styles.detailValue}>{toSafeText(row.emailaddress1)}</span>
                </Body1>
                <Body1>
                    <span className={styles.detailLabel}>Phone:</span>
                    <span className={styles.detailValue}>{toSafeText(row.telephone1)}</span>
                </Body1>
                <div className={styles.footer}>
                    <Button
                        appearance="subtle"
                        icon={<OpenRegular />}
                        aria-label={`Open ${toSafeText(row.name)} in a new window`}
                        onClick={(event) => {
                            void handleOpenButtonClick(event);
                        }}
                    >
                        Open record
                    </Button>
                </div>
            </div>
        </Card>
    );
};

const GeneratedComponent = (props: GeneratedComponentProps) => {
    const { dataApi } = props;
    const styles = useStyles();

    const [rows, setRows] = useState<AccountCardRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [hasMoreRows, setHasMoreRows] = useState<boolean>(false);
    const [loadMoreRowsFn, setLoadMoreRowsFn] = useState<(() => Promise<AccountQueryPage>) | undefined>();

    const queryOptions = useMemo<QueryTableOptions<"account">>(
        () => ({
            select: [...ACCOUNT_COLUMNS],
            orderBy: "name asc",
            pageSize: 50,
        }),
        [],
    );

    useEffect(() => {
        let mounted = true;

        const loadInitialData = async () => {
            setLoading(true);
            setError("");

            try {
                const result = (await dataApi.queryTable("account", queryOptions)) as AccountQueryPage;

                if (!mounted) {
                    return;
                }

                setRows(result.rows);
                setHasMoreRows(result.hasMoreRows);
                setLoadMoreRowsFn(() => result.loadMoreRows);
            } catch (fetchError) {
                if (!mounted) {
                    return;
                }

                const message = fetchError instanceof Error ? fetchError.message : "Failed to load account records.";
                setError(message);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        void loadInitialData();

        return () => {
            mounted = false;
        };
    }, [dataApi, queryOptions]);

    const handleOpen = useCallback(async (accountId: string) => {
        setError("");
        try {
            await openAccountRecord(accountId);
        } catch (openError) {
            const message = openError instanceof Error ? openError.message : "Unable to open the selected account.";
            setError(message);
        }
    }, []);

    const handleLoadMore = useCallback(async () => {
        if (!loadMoreRowsFn) {
            return;
        }

        setLoadingMore(true);
        setError("");

        try {
            const nextPage = await loadMoreRowsFn();
            setRows((prevRows) => [...prevRows, ...nextPage.rows]);
            setHasMoreRows(nextPage.hasMoreRows);
            setLoadMoreRowsFn(() => nextPage.loadMoreRows);
        } catch (loadMoreError) {
            const message = loadMoreError instanceof Error ? loadMoreError.message : "Failed to load more account records.";
            setError(message);
        } finally {
            setLoadingMore(false);
        }
    }, [loadMoreRowsFn]);

    return (
        <main className={styles.root} aria-label="Account card gallery">
            <header className={styles.header}>
                <Text as="h1" weight="semibold" size={500}>
                    Account gallery
                </Text>
                <Text size={200} aria-live="polite">
                    {rows.length} account{rows.length === 1 ? "" : "s"}
                </Text>
            </header>

            {error ? (
                <Body1 className={mergeClasses(styles.message, styles.error)} role="alert">
                    {error}
                </Body1>
            ) : null}

            {loading ? (
                <div className={styles.message}>
                    <Spinner label="Loading account records..." />
                </div>
            ) : (
                <div className={styles.scrollRegion}>
                    {rows.length === 0 ? (
                        <Body1 className={styles.message}>No account records found.</Body1>
                    ) : (
                        <div className={styles.grid}>
                            {rows.map((row) => (
                                <AccountCard key={row.accountid} row={row} onOpen={handleOpen} />
                            ))}
                        </div>
                    )}

                    {hasMoreRows ? (
                        <div className={styles.actions}>
                            <Button
                                appearance="outline"
                                onClick={() => {
                                    void handleLoadMore();
                                }}
                                disabled={loadingMore}
                                aria-label="Load more account records"
                            >
                                {loadingMore ? "Loading..." : "Load more"}
                            </Button>
                        </div>
                    ) : null}
                </div>
            )}
        </main>
    );
};

export default GeneratedComponent;
