import { renderTestLightboxUsingComponent } from "./__tests-services__/test-lightbox/testLightbox";
import TestOpenLightbox from "./__tests-services__/test-lightbox/TestOpenLightbox.vue";


test('rendering each type of source', async () => {
    const fsLightbox = await renderTestLightboxUsingComponent(TestOpenLightbox);

    expect(document.getElementsByTagName('img')).toHaveLength(1);
    expect(document.getElementsByTagName('video')).toHaveLength(1);
    expect(document.getElementsByTagName('iframe')).toHaveLength(0);
    expect(document.getElementsByClassName('fslightbox-invalid-file-wrapper')).toHaveLength(0);
    expect(document.getElementsByTagName('h6')).toHaveLength(1);

    await fsLightbox.core.slideIndexChanger.jumpTo(2);
    expect(document.getElementsByTagName('iframe')).toHaveLength(1);
    expect(document.getElementsByClassName('fslightbox-invalid-file-wrapper')).toHaveLength(1);
});
