(() => {
  let yOffset = 0; // window.pageYoffset;
  let prevScrollHeight = 0;
  let currentScene = 0;

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: [],
      },
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin'),
        canvas: document.querySelector('#video-canvas-1'),
        context: document.querySelector('#video-canvas-1').getContext('2d'),
        videoImages: [],
      },
      values: {
        videoImageCount: 960,
        imageSequence: [0, 960],
        canvas_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
        messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
        messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
        messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
        messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
        messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
        messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
        messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
        messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
        messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
        pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }],
      },
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvas: document.querySelector('.image-blend-canvas'),
        context: document.querySelector('.image-blend-canvas').getContext('2d'),
        imagePath: [
          './assets/img/blending/oban.jpg',
          './assets/img/blending/blend-image-2.jpg',
        ],
        images: [],
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        rectStartY: 0,
      },
    },
  ];

  const setCanvasImages = () => {
    let imgElm;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElm = new Image();
      imgElm.src = `./assets/img/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElm);
    }

    let imgElm2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElm2 = new Image();
      imgElm2.src = `./assets/img/002/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImages.push(imgElm2);
    }

    let imgElm3;
    for (let i = 0; i < sceneInfo[3].objs.imagePath.length; i++) {
      imgElm3 = new Image();
      imgElm3.src = sceneInfo[3].objs.imagePath[i];
      sceneInfo[3].objs.images.push(imgElm3);
    }
  };

  setCanvasImages();

  const setLayout = () => {
    // setting height of each scroll section
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    let totaScrolllHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totaScrolllHeight += sceneInfo[i].scrollHeight;

      if (totaScrolllHeight >= window.pageYOffset) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute(
      'class',
      `scroll-section-${currentScene}--active`
    );

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3D(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3D(-50%, -50%, 0) scale(${heightRatio})`;
  };

  const calcValue = (scene, values, currentYoffset) => {
    let rv;
    const scrollHeight = sceneInfo[scene].scrollHeight;
    let scrollRatio = currentYoffset / scrollHeight;

    if (values.length === 3) {
      // anim between start and end
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYoffset <= partScrollStart) {
        rv = values[0];
      } else if (
        partScrollStart <= currentYoffset &&
        currentYoffset <= partScrollEnd
      ) {
        rv =
          ((currentYoffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (partScrollEnd < currentYoffset) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  };

  const currentScrollAnim = (scene) => {
    const values = sceneInfo[scene].values;
    const obj = sceneInfo[scene].objs;
    const currentYoffset = yOffset - prevScrollHeight;
    const scrollRatio = currentYoffset / sceneInfo[scene].scrollHeight;

    switch (scene) {
      case 0:
        let sequence = Math.round(
          calcValue(scene, values.imageSequence, currentYoffset)
        );
        obj.context.drawImage(obj.videoImages[sequence], 0, 0);

        obj.canvas.style.opacity = calcValue(
          scene,
          values.canvas_opacity,
          currentYoffset
        );

        if (scrollRatio <= 0.22) {
          // in
          obj.messageA.style.opacity = calcValue(
            scene,
            values.messageA_opacity_in,
            currentYoffset
          );
          obj.messageA.style.transform = `translateY(${calcValue(
            scene,
            values.messageA_translateY_in,
            currentYoffset
          )}%)`;
        } else {
          // out
          obj.messageA.style.opacity = calcValue(
            scene,
            values.messageA_opacity_out,
            currentYoffset
          );
          obj.messageA.style.transform = `translateY(${calcValue(
            scene,
            values.messageA_translateY_out,
            currentYoffset
          )}%)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          obj.messageB.style.opacity = calcValue(
            scene,
            values.messageB_opacity_in,
            currentYoffset
          );
          obj.messageB.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageB_translateY_in,
            currentYoffset
          )}%, 0)`;
        } else {
          // out
          obj.messageB.style.opacity = calcValue(
            scene,
            values.messageB_opacity_out,
            currentYoffset
          );
          obj.messageB.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageB_translateY_out,
            currentYoffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          obj.messageC.style.opacity = calcValue(
            scene,
            values.messageC_opacity_in,
            currentYoffset
          );
          obj.messageC.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageC_translateY_in,
            currentYoffset
          )}%, 0)`;
        } else {
          // out
          obj.messageC.style.opacity = calcValue(
            scene,
            values.messageC_opacity_out,
            currentYoffset
          );
          obj.messageC.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageC_translateY_out,
            currentYoffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          obj.messageD.style.opacity = calcValue(
            scene,
            values.messageD_opacity_in,
            currentYoffset
          );
          obj.messageD.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageD_translateY_in,
            currentYoffset
          )}%, 0)`;
        } else {
          // out
          obj.messageD.style.opacity = calcValue(
            scene,
            values.messageD_opacity_out,
            currentYoffset
          );
          obj.messageD.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageD_translateY_out,
            currentYoffset
          )}%, 0)`;
        }

        // objs.element1.style;
        break;
      case 1:
        break;
      case 2:
        let sequence2 = Math.round(
          calcValue(scene, values.imageSequence, currentYoffset)
        );
        obj.context.drawImage(obj.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          obj.canvas.style.opacity = calcValue(
            scene,
            values.canvas_opacity_in,
            currentYoffset
          );
        } else {
          obj.canvas.style.opacity = calcValue(
            scene,
            values.canvas_opacity_out,
            currentYoffset
          );
        }

        if (scrollRatio <= 0.32) {
          // in
          obj.messageA.style.opacity = calcValue(
            scene,
            values.messageA_opacity_in,
            currentYoffset
          );
          obj.messageA.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageA_translateY_in,
            currentYoffset
          )}%, 0)`;
        } else {
          // out
          obj.messageA.style.opacity = calcValue(
            scene,
            values.messageA_opacity_out,
            currentYoffset
          );
          obj.messageA.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageA_translateY_out,
            currentYoffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.67) {
          // in
          obj.messageB.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageB_translateY_in,
            currentYoffset
          )}%, 0)`;
          obj.messageB.style.opacity = calcValue(
            scene,
            values.messageB_opacity_in,
            currentYoffset
          );
          obj.pinB.style.transform = `scaleY(${calcValue(
            scene,
            values.pinB_scaleY,
            currentYoffset
          )})`;
        } else {
          // out
          obj.messageB.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageB_translateY_out,
            currentYoffset
          )}%, 0)`;
          obj.messageB.style.opacity = calcValue(
            scene,
            values.messageB_opacity_out,
            currentYoffset
          );
          obj.pinB.style.transform = `scaleY(${calcValue(
            scene,
            values.pinB_scaleY,
            currentYoffset
          )})`;
        }

        if (scrollRatio <= 0.93) {
          // in
          obj.messageC.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageC_translateY_in,
            currentYoffset
          )}%, 0)`;
          obj.messageC.style.opacity = calcValue(
            scene,
            values.messageC_opacity_in,
            currentYoffset
          );
          obj.pinC.style.transform = `scaleY(${calcValue(
            scene,
            values.pinC_scaleY,
            currentYoffset
          )})`;
        } else {
          // out
          obj.messageC.style.transform = `translate3d(0, ${calcValue(
            scene,
            values.messageC_translateY_out,
            currentYoffset
          )}%, 0)`;
          obj.messageC.style.opacity = calcValue(
            scene,
            values.messageC_opacity_out,
            currentYoffset
          );
          obj.pinC.style.transform = `scaleY(${calcValue(
            scene,
            values.pinC_scaleY,
            currentYoffset
          )})`;
        }

        // Draw Image on canvas which is being used on case 3 (inside case 2)
        if (scrollRatio > 0.9) {
          const values = sceneInfo[3].values;
          const obj = sceneInfo[3].objs;
          const widthRatio = window.innerWidth / obj.canvas.width;
          const heightRatio = window.innerHeight / obj.canvas.height;
          let canvasScaleRatio;

          if (widthRatio <= heightRatio) {
            canvasScaleRatio = heightRatio;
          } else {
            canvasScaleRatio = widthRatio;
          }

          obj.canvas.style.transform = `scale(${canvasScaleRatio})`;
          obj.context.fillStyle = 'white';
          obj.context.drawImage(obj.images[0], 0, 0);

          const recalInnerWidth = window.innerWidth / canvasScaleRatio;
          const recalInnerHeight = window.innerHeight / canvasScaleRatio;

          const whiteRectWidth = recalInnerWidth * 0.15;
          values.rect1X[0] = (obj.canvas.width - recalInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] =
            values.rect1X[0] + recalInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          obj.context.fillRect(
            parseInt(values.rect1X[0]),
            0,
            parseInt(whiteRectWidth),
            obj.canvas.height
          );
          obj.context.fillRect(
            parseInt(values.rect2X[0]),
            0,
            parseInt(whiteRectWidth),
            obj.canvas.height
          );
        }

        break;

      case 3:
        let step = 0;
        const widthRatio = window.innerWidth / obj.canvas.width;
        const heightRatio = window.innerHeight / obj.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          canvasScaleRatio = heightRatio;
        } else {
          canvasScaleRatio = widthRatio;
        }

        obj.canvas.style.transform = `scale(${canvasScaleRatio})`;
        obj.context.fillStyle = 'white';
        obj.context.drawImage(obj.images[0], 0, 0);

        const recalInnerWidth = window.innerWidth / canvasScaleRatio;
        const recalInnerHeight = window.innerHeight / canvasScaleRatio;

        // console.log(obj.canvas.getBoundingClientRect());
        if (!values.rectStartY) {
          // values.rectStartY = obj.canvas.getBoundingClientRect().top;
          values.rectStartY =
            obj.canvas.offsetTop +
            (obj.canvas.height - obj.canvas.height * canvasScaleRatio) / 2;

          values.rect1X[2].start =
            window.innerHeight / 2 / sceneInfo[scene].scrollHeight;
          values.rect2X[2].start =
            window.innerHeight / 2 / sceneInfo[scene].scrollHeight;

          values.rect1X[2].end =
            values.rectStartY / sceneInfo[scene].scrollHeight;
          values.rect2X[2].end =
            values.rectStartY / sceneInfo[scene].scrollHeight;
        }

        const whiteRectWidth = recalInnerWidth * 0.15;
        values.rect1X[0] = (obj.canvas.width - recalInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] = values.rect1X[0] + recalInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        obj.context.fillRect(
          parseInt(calcValue(scene, values.rect1X, currentYoffset)),
          0,
          parseInt(whiteRectWidth),
          obj.canvas.height
        );
        obj.context.fillRect(
          parseInt(calcValue(scene, values.rect2X, currentYoffset)),
          0,
          parseInt(whiteRectWidth),
          obj.canvas.height
        );

        // if canvas does not touch top of the browser
        if (scrollRatio < values.rect1X[2].end) {
          step = 1;
          console.log('Bafore canvas touch the top');
          obj.canvas.classList.remove('sticky');
        } else {
          step = 2;
          console.log('After canvas touch the top');
          obj.canvas.classList.add('sticky');
          obj.canvas.style.top = `${
            -(obj.canvas.height - obj.canvas.height * canvasScaleRatio) / 2
          }px`;
          // if () {
          //   step = 3;
          // }
        }

        break;
      default:
    }
  };

  const scrollLoop = () => {
    prevScrollHeight = 0;
    let enterNewScence = false;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScence = true;
      currentScene += 1;

      document.body.setAttribute(
        'class',
        `scroll-section-${currentScene}--active`
      );
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      enterNewScence = true;
      currentScene -= 1;

      document.body.setAttribute(
        'class',
        `scroll-section-${currentScene}--active`
      );
    }

    if (!enterNewScence) {
      currentScrollAnim(currentScene);
    }
  };

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  });
  window.addEventListener('resize', setLayout);

  setLayout();
})();
