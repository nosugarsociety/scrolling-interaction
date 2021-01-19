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
      objs: {
        container: document.querySelector('#scroll-section-0'),
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
    // console.log('win pyoff:', window.pageYOffset);
    for (let i = 0; i < sceneInfo.length; i++) {
      totaScrolllHeight += sceneInfo[i].scrollHeight;

      if (totaScrolllHeight >= window.pageYOffset) {
        currentScene = i;
        console.log('set Layout currentScene:', currentScene);
        break;
      }
    }

    document.body.setAttribute(
      'class',
      `scroll-section-${currentScene}--active`
    );
  };

  const scrollLoop = () => {
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene += 1;

      document.body.setAttribute(
        'class',
        `scroll-section-${currentScene}--active`
      );
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene -= 1;

      document.body.setAttribute(
        'class',
        `scroll-section-${currentScene}--active`
      );
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
