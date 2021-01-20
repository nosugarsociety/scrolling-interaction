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
      values: { opacity: [0, 1] },
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
    let scrollRatio = currentYoffset / sceneInfo[scene].scrollHeight;
    rv = scrollRatio * (values[1] - values[0]) + values[0];
    return rv;
  };

  const currentScrollAnim = (scene) => {
    const values = sceneInfo[scene].values;
    const obj = sceneInfo[scene].objs;
    const currentYoffset = yOffset - prevScrollHeight;

    switch (scene) {
      case 0:
        let oMessageA = calcValue(scene, values.opacity, currentYoffset);
        obj.messageA.style.opacity = oMessageA;

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

// set message a, b, c, d selector inside sceneInfo

// values for opacity control area
// make function which only work depend on currentScene
// use Switch statement

// calcValues function
// find out cuuretYoffset

// fix the bug when scroll hits the top of section.

// set specific timing for animmation
