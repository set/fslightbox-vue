export function SourceOuterTransformer({ elements: { sourcesOuters }, props: { slideDistance } }, i) {
    const realSlideDistance = slideDistance + 1;
    let additionalTransformValue = 0;

    this.byValue = (value) => {
        additionalTransformValue = value;
        return this;
    };

    this.negative = () => {
        setFinalTransformAndCleanTransformer(-getDefaultTransformDistance());
    };

    this.zero = () => {
        setFinalTransformAndCleanTransformer(0);
    };

    this.positive = () => {
        setFinalTransformAndCleanTransformer(getDefaultTransformDistance());
    };

    const setFinalTransformAndCleanTransformer = (value) => {
        sourcesOuters[i].style.transform = `translateX(${ value + additionalTransformValue }px)`;
        additionalTransformValue = 0;
    };

    const getDefaultTransformDistance = () => realSlideDistance * innerWidth;
}
