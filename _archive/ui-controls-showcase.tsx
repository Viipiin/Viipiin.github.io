import { useMemo, useState } from "react";
import {
    Badge,
    Body1,
    Button,
    Card,
    CardHeader,
    Checkbox,
    Dialog,
    DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Divider,
    Field,
    Input,
    MessageBar,
    Option,
    ProgressBar,
    Slider,
    Spinner,
    Switch,
    Tab,
    TabList,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Text,
    Textarea,
    Dropdown,
    makeStyles,
    mergeClasses,
    tokens,
} from "@fluentui/react-components";
import { AddRegular, AlertRegular, ArrowDownloadRegular, ChartMultipleRegular, EditRegular, StarRegular } from "@fluentui/react-icons";
import * as d3 from "d3";
import type { GeneratedComponentProps } from "./RuntimeTypes";

type DemoRow = {
    id: string;
    name: string;
    role: string;
    status: "Active" | "Pending" | "Blocked";
    completion: number;
};

type ChartPoint = {
    label: string;
    value: number;
};

const demoRows: DemoRow[] = [
    { id: "1", name: "Ava Johnson", role: "Designer", status: "Active", completion: 84 },
    { id: "2", name: "Noah Davis", role: "Developer", status: "Pending", completion: 56 },
    { id: "3", name: "Mia Wilson", role: "Product Lead", status: "Blocked", completion: 31 },
    { id: "4", name: "Liam Thomas", role: "QA Engineer", status: "Active", completion: 92 },
];

const chartData: ChartPoint[] = [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 66 },
    { label: "Wed", value: 51 },
    { label: "Thu", value: 78 },
    { label: "Fri", value: 59 },
];

const statusIntentMap: Record<DemoRow["status"], "success" | "warning" | "danger"> = {
    Active: "success",
    Pending: "warning",
    Blocked: "danger",
};

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
    heroCard: {
        background: `linear-gradient(135deg, ${tokens.colorBrandBackground2} 0%, ${tokens.colorPalettePurpleBackground2} 100%)`,
        color: tokens.colorNeutralForegroundOnBrand,
    },
    heroRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: tokens.spacingHorizontalL,
        flexWrap: "wrap",
    },
    heroActions: {
        display: "flex",
        gap: tokens.spacingHorizontalS,
        flexWrap: "wrap",
    },
    content: {
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
        paddingBottom: tokens.spacingVerticalM,
    },
    tabList: {
        marginBottom: tokens.spacingVerticalS,
    },
    sectionCard: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalM,
    },
    sectionGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: tokens.spacingHorizontalM,
        "@media (max-width: 960px)": {
            gridTemplateColumns: "1fr",
        },
    },
    controlStack: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalS,
    },
    miniCardGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: tokens.spacingHorizontalM,
    },
    miniCard: {
        minHeight: "132px",
    },
    chartWrap: {
        width: "100%",
        overflowX: "auto",
        borderRadius: tokens.borderRadiusMedium,
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        padding: tokens.spacingHorizontalM,
        boxSizing: "border-box",
    },
    chartSvg: {
        width: "100%",
        minWidth: "320px",
        height: "220px",
    },
    tableWrap: {
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        borderRadius: tokens.borderRadiusMedium,
        overflow: "auto",
    },
    footerNote: {
        color: tokens.colorNeutralForeground2,
    },
    kpiRow: {
        display: "flex",
        gap: tokens.spacingHorizontalS,
        flexWrap: "wrap",
    },
    progressRow: {
        display: "flex",
        flexDirection: "column",
        gap: tokens.spacingVerticalXS,
    },
    editor: {
        minHeight: "110px",
    },
});

const getBarPath = (data: ChartPoint[], width: number, height: number): Array<{ x: number; y: number; w: number; h: number; label: string; value: number }> => {
    const x = d3.scaleBand<string>().domain(data.map((d) => d.label)).range([20, width - 20]).padding(0.22);
    const y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.value) ?? 100]).nice().range([height - 28, 16]);
    return data.map((d) => {
        const xPos = x(d.label) ?? 0;
        const yPos = y(d.value);
        return { x: xPos, y: yPos, w: x.bandwidth(), h: height - 28 - yPos, label: d.label, value: d.value };
    });
};

const ChartPanel = () => {
    const styles = useStyles();
    const width = 640;
    const height = 220;
    const bars = useMemo(() => getBarPath(chartData, width, height), []);

    return (
        <div className={styles.chartWrap}>
            <Text weight="semibold">Weekly activity chart (demo)</Text>
            <svg className={styles.chartSvg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Weekly activity bar chart">
                {bars.map((bar) => (
                    <g key={bar.label}>
                        <rect x={bar.x} y={bar.y} width={bar.w} height={bar.h} rx={8} fill={tokens.colorBrandBackground} />
                        <text x={bar.x + bar.w / 2} y={bar.y - 6} textAnchor="middle" fill={tokens.colorNeutralForeground1} fontSize="12">
                            {bar.value}
                        </text>
                        <text x={bar.x + bar.w / 2} y={height - 8} textAnchor="middle" fill={tokens.colorNeutralForeground2} fontSize="12">
                            {bar.label}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

const GeneratedComponent = (_props: GeneratedComponentProps) => {
    const styles = useStyles();
    const [activeTab, setActiveTab] = useState<string>("form");
    const [name, setName] = useState<string>("Nova UI Lab");
    const [priority, setPriority] = useState<string>("high");
    const [description, setDescription] = useState<string>("Creative control playground with rich Fluent UI patterns.");
    const [notify, setNotify] = useState<boolean>(true);
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [quality, setQuality] = useState<number>(78);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [showInfoBar, setShowInfoBar] = useState<boolean>(true);

    return (
        <main className={styles.root} aria-label="UI controls showcase page">
            <Card className={styles.heroCard}>
                <div className={styles.heroRow}>
                    <div className={styles.controlStack}>
                        <Text as="h1" weight="semibold" size={700}>
                            UI skills showcase
                        </Text>
                        <Body1>
                            A creative demo page presenting forms, dialogs, notifications, chart visuals, tabs, badges, progress states, and data-table style controls.
                        </Body1>
                        <div className={styles.kpiRow}>
                            <Badge appearance="filled" color="important" icon={<StarRegular />}>
                                Premium
                            </Badge>
                            <Badge appearance="tint" color="success">
                                24 controls showcased
                            </Badge>
                            <Badge appearance="outline" color="informative">
                                Demo mode
                            </Badge>
                        </div>
                    </div>
                    <div className={styles.heroActions}>
                        <Button appearance="primary" icon={<AddRegular />}>
                            Create demo card
                        </Button>
                        <Button appearance="outline" icon={<ArrowDownloadRegular />}>
                            Export style kit
                        </Button>
                    </div>
                </div>
            </Card>

            <div className={styles.content}>
                {showInfoBar ? (
                    <MessageBar intent="info" actions={<Button appearance="subtle" onClick={() => setShowInfoBar(false)}>Dismiss</Button>}>
                        This page uses mock/demo data and is intended to preview Fluent UI controls and layouts.
                    </MessageBar>
                ) : null}

                <TabList
                    selectedValue={activeTab}
                    onTabSelect={(_, data) => setActiveTab(String(data.value))}
                    className={styles.tabList}
                    aria-label="UI showcase sections"
                >
                    <Tab id="form" value="form" icon={<EditRegular />}>
                        Forms
                    </Tab>
                    <Tab id="insights" value="insights" icon={<ChartMultipleRegular />}>
                        Charts + table
                    </Tab>
                    <Tab id="feedback" value="feedback" icon={<AlertRegular />}>
                        Dialogs + feedback
                    </Tab>
                </TabList>

                {activeTab === "form" ? (
                    <Card className={styles.sectionCard}>
                        <CardHeader header={<Text weight="semibold">Form controls</Text>} description="Input, dropdown, checkbox, switch, textarea, slider and progress states." />
                        <div className={styles.sectionGrid}>
                            <div className={styles.controlStack}>
                                <Field label="Project name">
                                    <Input value={name} onChange={(_, data) => setName(data.value)} />
                                </Field>
                                <Field label="Priority">
                                    <Dropdown value={priority} selectedOptions={[priority]} onOptionSelect={(_, data) => setPriority(data.optionValue ?? "high")}>
                                        <Option value="high">High</Option>
                                        <Option value="medium">Medium</Option>
                                        <Option value="low">Low</Option>
                                    </Dropdown>
                                </Field>
                                <Field label="Description">
                                    <Textarea className={styles.editor} value={description} onChange={(_, data) => setDescription(data.value)} />
                                </Field>
                            </div>
                            <div className={styles.controlStack}>
                                <Checkbox label="Enable email notifications" checked={notify} onChange={(_, data) => setNotify(Boolean(data.checked))} />
                                <Switch label="Private workspace" checked={isPrivate} onChange={(_, data) => setIsPrivate(Boolean(data.checked))} />
                                <Field label={`Quality score: ${quality}`}>
                                    <Slider min={0} max={100} value={quality} onChange={(_, data) => setQuality(Number(data.value))} />
                                </Field>
                                <div className={styles.progressRow}>
                                    <Text>Publishing progress</Text>
                                    <ProgressBar value={quality / 100} />
                                    <Spinner size="tiny" labelPosition="after">Background checks running</Spinner>
                                </div>
                            </div>
                        </div>
                    </Card>
                ) : null}

                {activeTab === "insights" ? (
                    <Card className={styles.sectionCard}>
                        <CardHeader header={<Text weight="semibold">Insight controls</Text>} description="Mock chart, KPI cards and a data-table style block." />
                        <div className={styles.miniCardGrid}>
                            <Card className={styles.miniCard}>
                                <CardHeader header={<Text weight="semibold">User growth</Text>} />
                                <Text size={600} weight="semibold">+23.4%</Text>
                                <Body1 className={styles.footerNote}>Compared to last week</Body1>
                            </Card>
                            <Card className={styles.miniCard}>
                                <CardHeader header={<Text weight="semibold">Engagement</Text>} />
                                <Text size={600} weight="semibold">81%</Text>
                                <Body1 className={styles.footerNote}>Healthy interaction rate</Body1>
                            </Card>
                            <Card className={styles.miniCard}>
                                <CardHeader header={<Text weight="semibold">Open issues</Text>} />
                                <Text size={600} weight="semibold">07</Text>
                                <Body1 className={styles.footerNote}>2 require immediate action</Body1>
                            </Card>
                        </div>
                        <ChartPanel />
                        <div className={styles.tableWrap}>
                            <Table aria-label="Demo team table">
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderCell>Name</TableHeaderCell>
                                        <TableHeaderCell>Role</TableHeaderCell>
                                        <TableHeaderCell>Status</TableHeaderCell>
                                        <TableHeaderCell>Completion</TableHeaderCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {demoRows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.role}</TableCell>
                                            <TableCell>
                                                <Badge color={statusIntentMap[row.status]}>{row.status}</Badge>
                                            </TableCell>
                                            <TableCell>{row.completion}%</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                ) : null}

                {activeTab === "feedback" ? (
                    <Card className={styles.sectionCard}>
                        <CardHeader header={<Text weight="semibold">Dialogs and notifications</Text>} description="Interactive feedback patterns with message bars and dialog actions." />
                        <div className={styles.controlStack}>
                            <MessageBar intent="success">Theme tokens applied successfully across all demo sections.</MessageBar>
                            <MessageBar intent="warning">A few controls are in preview mode and may evolve.</MessageBar>
                            <MessageBar intent="error">Simulated validation alert: please review required fields.</MessageBar>
                        </div>
                        <Divider />
                        <Dialog open={dialogOpen} onOpenChange={(_, data) => setDialogOpen(data.open)}>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="primary">Open creative dialog</Button>
                            </DialogTrigger>
                            <DialogSurface>
                                <DialogBody>
                                    <DialogTitle>Launch a quick demo action</DialogTitle>
                                    <DialogContent>
                                        This dialog demonstrates modal layering, action grouping, and typography contrast in Fluent UI.
                                    </DialogContent>
                                    <DialogActions>
                                        <DialogTrigger disableButtonEnhancement>
                                            <Button appearance="secondary">Cancel</Button>
                                        </DialogTrigger>
                                        <Button appearance="primary" onClick={() => setDialogOpen(false)}>
                                            Confirm
                                        </Button>
                                    </DialogActions>
                                </DialogBody>
                            </DialogSurface>
                        </Dialog>
                    </Card>
                ) : null}
            </div>

            <Text className={mergeClasses(styles.footerNote)} size={200}>
                Tip: Use this page as a visual reference when building future generative pages with similar interaction patterns.
            </Text>
        </main>
    );
};

export default GeneratedComponent;
