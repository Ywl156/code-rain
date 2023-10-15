/**
 * @code 随机下落的字符
 * @fontSize 下落字符的字体大小
 * @textColor 字符的字体颜色
 * @bgColor 背景颜色
 * @initBgColor 初始背景颜色，防止初次渲染时闪动
 * @gap 字符的左右间隙，screen.availWidth / gap = 字符列数
 * @speed 字符下落速度
 */
interface DefaultOptions {
  code: string;
  fontSize: number;
  textColor: string;
  bgColor: string;
  initBgColor: string;
  gap: number;
  speed: number;
}
interface Options extends Partial<DefaultOptions> {}

class CodeRain {
  private options: DefaultOptions;
  private oldOptions: DefaultOptions | null = null;
  private timer: number | null = null;
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private oneFlag = 1;
  private ctxEnv = true;
  private codeArr: string[];
  private pointArr: number[];

  constructor(options: Options) {
    this.options = Object.assign(
      {
        code: 'Hello World',
        fontSize: 16,
        textColor: '#0f0',
        bgColor: 'rgba(0,0,0,0.05)',
        initBgColor: 'rgba(0,0,0)',
        gap: 15,
        speed: 10,
      },
      options
    );

    this.canvas = document.createElement('canvas');
    this.canvas.width = screen.availWidth;
    this.canvas.height = screen.availHeight;
    this.canvas.style.cssText = 'position:fixed;left:0;top:0;z-index:-9999;';
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    document.body.appendChild(this.canvas);
    if (!this.ctx) this.ctxEnv = false;
    this.codeArr = this.options.code.split('');
    this.pointArr = Array(Math.floor(this.canvas.width / this.options.gap)).fill(0);
  }
  /**
   * 开始背景雨效果
   */
  start() {
    if (!this.ctxEnv) return;
    this.timer = setInterval(() => {
      const { code, fontSize, textColor, bgColor, initBgColor, gap, speed } = this.options;
      if (this.oldOptions) {
        if (this.oldOptions.code !== code) {
          this.codeArr = code.split('');
        }
        if (this.oldOptions.gap !== gap) {
          this.pointArr = Array(Math.floor(this.canvas.width / gap)).fill(0);
        }
      }

      if (this.oneFlag) {
        this.oneFlag = 0;
        this.ctx.fillStyle = initBgColor;
      } else {
        this.ctx.fillStyle = bgColor;
      }
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.font = `${fontSize}px ${document.documentElement.style.fontFamily}`;
      this.ctx.fillStyle = textColor;
      this.pointArr.forEach((point, index) => {
        this.ctx.fillText(this.codeArr[Math.floor(Math.random() * this.codeArr.length)], index * gap, point);
        this.pointArr[index] = point > this.canvas.height || point > this.canvas.height * Math.random() * 10 ? 0 : point + speed;
      });
    }, 60);
  }
  /**
   * 暂停背景雨效果，start()可恢复
   */
  pause() {
    if (!this.ctxEnv) return;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  /**
   * 改变选项属性，实时变化背景雨效果
   */
  change(options: Options) {
    if (!this.ctxEnv) return;
    this.oldOptions = this.options;
    this.options = Object.assign(this.options, options);
  }
  /**
   * 清除背景雨效果
   */
  clear() {
    if (!this.ctxEnv) return;
    this.pause();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.oneFlag = 1;
    this.pointArr = Array(Math.floor(this.canvas.width / this.options.gap)).fill(0);
  }
}

export default CodeRain;
