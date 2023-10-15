## code rain background (代码雨背景)

### 效果图

![背景雨默认效果图](assets/renderImage.png)

### 安装

`npm i c-rain`

### 全局引入

```javascript
<script stc="https://unpkg.com/c-rain/dist/index.js"></script>
```

### 使用

```javascript
import CodeRain from 'c-rain';
// or
// <script stc="https://unpkg.com/c-rain/dist/index.js"></script> 全局暴露了CodeRain类

/**
 * 参数 options 可选（或部分传入）
 * @code 随机下落的字符
 * @fontSize 下落字符的字体大小
 * @textColor 字符的字体颜色
 * @bgColor 背景颜色
 * @initBgColor 初始背景颜色，防止初次渲染时闪动
 * @gap 字符的左右间隙，screen.availWidth / gap = 字符列数
 * @speed 字符下落速度
 */
/**
 * 默认参数
  {
    code: 'Hello World',
    fontSize: 16,
    textColor: '#0f0',
    bgColor: 'rgba(0,0,0,0.05)',
    initBgColor: 'rgba(0,0,0)',
    gap: 15,
    speed: 10,
  }
 */
const codeRain = new CodeRain(options);

// 实例方法
// 开始背景雨效果
codeRain.start();
// 暂停背景雨效果，start()可恢复
codeRain.stop();
// 改变选项属性，实时变化背景雨效果
codeRain.change(options);
// 清除背景雨效果
codeRain.clear();
```
