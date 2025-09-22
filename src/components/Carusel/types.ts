export interface ImgItem {
    src: string; // 图片地址
    key: string | number; // 图片唯一标识
}
export interface CaruselProps {
    imgList: Array<ImgItem>; // 图片列表
    showBtn?: boolean; // 是否显示切换按钮
    showSpot?: boolean; // 是否显示指示点
    width?: number; // 轮播图宽度
    height?: number; // 轮播图高度
    autoPlay?: boolean; // 是否自动轮播
    interval?: number; // 自动轮播时间间隔
}