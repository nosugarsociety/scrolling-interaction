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
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }],
      },
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('.main-message.a'),
        messageB: document.querySelector('.main-message.b'),
        messageC: document.querySelector('.main-message.c'),
        messageD: document.querySelector('.main-message.d'),
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
      },
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];

  const setLayout = () => {
    // setting height of each scroll section
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
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
        let oMessageA_in = calcValue(
          scene,
          values.messageA_opacity_in,
          currentYoffset
        );
        let tMessageA_in = calcValue(
          scene,
          values.messageA_translateY_in,
          currentYoffset
        );
        let oMessageA_out = calcValue(
          scene,
          values.messageA_opacity_out,
          currentYoffset
        );
        let tMessageA_out = calcValue(
          scene,
          values.messageA_translateY_out,
          currentYoffset
        );

        // console.log('tma_in:', tMessageA_in);
        console.log('tma_out:', tMessageA_out);

        if (scrollRatio <= 0.22) {
          // in
          obj.messageA.style.opacity = oMessageA_in;
          obj.messageA.style.transform = `translateY(${tMessageA_in}%)`;
        } else {
          // out
          obj.messageA.style.opacity = oMessageA_out;
          obj.messageA.style.transform = `translateY(${tMessageA_out}%)`;
        }

        // objs.element1.style;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
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

  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  setLayout();
})();
