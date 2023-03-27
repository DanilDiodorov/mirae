import BackgroundService from 'react-native-background-actions';


const options = {
    taskName: 'Example',
    taskTitle: 'Mirae',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 1000,
    },
};

export const startBackgroundService = (veryIntensiveTask) => {
    if (!BackgroundService.isRunning()){
        BackgroundService.start(veryIntensiveTask, options);
    }

}
