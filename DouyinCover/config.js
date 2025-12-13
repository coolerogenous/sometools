/**
 * 抖音封面生成器配置文件
 * 修改完成后，请在浏览器按 Ctrl + F5 强制刷新网页
 */

const CONFIG = {
    // === 1. 默认比例设置 ===
    ratio: {
        width: 4,  // 宽
        height: 3   // 高 (会自动生成对应的横竖两版)
    },
    baseResolution: 1080, // 清晰度基准 (像素)

    // === 2. 歌曲信息 ===
    song: {
        title: "忽然之间",
        // artist: "zzz",
        artist: "sourvill",
    },

    // === 3. 歌词内容 ===
    // 提示：使用 \n 来换行
    // lyrics: "{\\__/} \n ( • - •) \n /つ 🍓 \n 十二楼",
    lyrics: "Loading···",
    
    // 字体缩放 (1.0 为标准大小)
    fontScale: 1.0,

    // === 4. 播放器状态 ===
    player: {
        currentTime: "3:00",
        timeLeft: "-1:00",
        progress: 0.72, // 进度条位置 (0.0 到 1.0)
    },

    // === 5. 外观与背景 ===
    appearance: {
        // 背景遮罩浓度 (0.0 - 0.9), 0 为无遮罩，数值越大越黑
        overlayOpacity: 0.9,
        
        // 【可选】背景图网络链接
        // 如果想用本地图片，请保持为空 ""，然后在网页界面上手动上传
        backgroundImageUrl: "" 
    },

    // === 6. UI 颜色配置 (必须使用十六进制颜色码，如 #ff0000) ===
    // colors: {
    //     progressBar: "#9c11ff",        // 进度条颜色 (默认蓝)
    //     progressBackground: "#e5e5e5", // 进度条底色 (默认灰)
    //     mainButtons: "#ffffff",        // 主按钮颜色：播放/暂停/快进 (默认黑)
    //     functionButtons: "#9c11ff",    // 功能按钮颜色：音量/删除 (默认红)
    // },
    colors: {
        progressBar: "#ff75d6",        // 进度条颜色 (默认蓝)
        progressBackground: "#e5e5e5", // 进度条底色 (默认灰)
        mainButtons: "#ffffff",        // 主按钮颜色：播放/暂停/快进 (默认黑)
        functionButtons: "#ff75d6",    // 功能按钮颜色：音量/删除 (默认红)
    }
};