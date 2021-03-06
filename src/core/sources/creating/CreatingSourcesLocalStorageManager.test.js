import { CreatingSourcesLocalStorageManager } from "./CreatingSourcesLocalStorageManager";
import { SOURCES_TYPES_KEY } from "../../../constants/local-storage-constants";

const fsLightbox = { props: { disableLocalStorage: false } };

let creatingSourcesLocalStorageManager;

const createNewLocalStorageAndCallGetSourceTypeFromLocalStorageByUrl = (url) => {
    creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);
    return creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl(url);
};

describe('getSourceTypeFromLocalStorageByUrl', () => {
    test('localStorage is disabled', () => {
        localStorage.setItem(SOURCES_TYPES_KEY, JSON.stringify({
            'first-url': 'image'
        }));
        fsLightbox.props.disableLocalStorage = true;
        creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);

        expect("" + creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl)
            .toEqual("" + function () {});
    });

    test('localStorage is enabled', () => {
        delete fsLightbox.props.disableLocalStorage;
        localStorage.setItem(SOURCES_TYPES_KEY, JSON.stringify({
            'first-url': 'image'
        }));

        expect(createNewLocalStorageAndCallGetSourceTypeFromLocalStorageByUrl('first-url')).toBe('image');
        expect(createNewLocalStorageAndCallGetSourceTypeFromLocalStorageByUrl('random-url')).toBeUndefined();

        localStorage.removeItem(SOURCES_TYPES_KEY);
        expect(createNewLocalStorageAndCallGetSourceTypeFromLocalStorageByUrl('random-url')).toBeUndefined();
    });
});

describe('handleRetrievedSourceTypeFromUrl', () => {
    test('localStorage is disabled', () => {
        fsLightbox.props.disableLocalStorage = true;
        creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);

        expect("" + creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl)
    });

    describe('localStorage is enabled', () => {
        describe('localStorage is not empty', () => {
            beforeAll(() => {
                // we will be testing for updating sources types in local storage if
                // second-url and third-url are filled
                localStorage.setItem(SOURCES_TYPES_KEY, JSON.stringify({
                    'first-url': 'image',
                    'fourth-url': 'video'
                }));

                fsLightbox.props.disableLocalStorage = undefined;
                creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);

                // calling getSourceTypeFromLocalStorageFromUrl for those urls to init waiting for types to come
                creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl('second-url');
                creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl('third-url');
            });


            test('calling handleRetrieveSourceTypeForUrl for one missing url', () => {
                creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl('youtube', 'second-url');

                expect(localStorage.getItem(SOURCES_TYPES_KEY)).toEqual(JSON.stringify({
                    'first-url': 'image',
                    'fourth-url': 'video'
                }));
            });

            test('calling handleRetrieveSourceTypeForUrl for second missing url', () => {
                creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl('invalid', 'third-url');

                expect(localStorage.getItem(SOURCES_TYPES_KEY)).toEqual(JSON.stringify({
                    'first-url': 'image',
                    'fourth-url': 'video',
                    'second-url': 'youtube',
                    'third-url': 'invalid'
                }));
            });
        });

        describe('localStorage is empty', () => {
            beforeAll(() => {
                localStorage.removeItem(SOURCES_TYPES_KEY);

                // we will be testing for adding sources types for fifth-url and six-url
                fsLightbox.props.disableLocalStorage = undefined;
                creatingSourcesLocalStorageManager = new CreatingSourcesLocalStorageManager(fsLightbox);

                // calling getSourceTypeFromLocalStorageFromUrl for those urls to init waiting for types to come
                creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl('fifth-url');
                creatingSourcesLocalStorageManager.getSourceTypeFromLocalStorageByUrl('sixth-url');
            });

            test('calling handleRetrieveSourceTypeForUrl for one missing url', () => {
                creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl('image', 'fifth-url');

                expect(localStorage.getItem(SOURCES_TYPES_KEY)).toBeNull();
            });

            test('calling handleRetrieveSourceTypeForUrl for second missing url', () => {
                creatingSourcesLocalStorageManager.handleReceivedSourceTypeForUrl('video', 'sixth-url');

                expect(localStorage.getItem(SOURCES_TYPES_KEY)).toEqual(JSON.stringify({
                    'fifth-url': 'image',
                    'sixth-url': 'video',
                }));
            });
        });
    });
})
;
