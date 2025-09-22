export interface CardProps {
    title: string; // 卡片标题
    content: string; // 卡片内容
    footer?: string; // 卡片底部内容
    bodyStyle?: Record<string, any> | undefined; // 卡片主体样式
    headerClass?: string; // 卡片头部类名
    footerClass?: string; // 卡片底部类名
    bodyClass?: string; // 卡片主体类名
}