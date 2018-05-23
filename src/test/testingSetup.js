import { savePost } from '../business/Post';
import { savePin } from '../business/Pin';

export const authUser123 = {
  uid: '123',
  displayName: 'Max Muster',
  email: 'maxmuster@gmail.com',
  photoURL: null,
};
export const authUser573 = {
  uid: '573',
  displayName: 'Nicole Master',
  email: 'nicolemaster@gmail.com',
  photoURL: null,
};

export const pinInfos = {
  pinInfoCategory1: {
    userId: authUser123.uid,
    title: 'PinC1',
    area: {
      radius: 5,
      location: {
        latitude: parseFloat(47.22766439912273),
        longitude: parseFloat(8.829900391093531),
      },
    },
    categories: {
      1: true,
    },
  },
  pinInfoCategory02: {
    userId: authUser123.uid,
    title: 'PinC02',
    area: {
      radius: 3.5,
      location: {
        latitude: parseFloat(47.226305327006884),
        longitude: parseFloat(8.851478787509192),
      },
    },
    categories: {
      0: true,
      2: true,
    },
  },
  pinInfoCategory0123: {
    userId: authUser573.uid,
    title: 'PinC0123',
    area: {
      radius: 4.3,
      location: {
        latitude: parseFloat(47.23983027553942),
        longitude: parseFloat(8.807899555930968),
      },
    },
    categories: {
      0: true,
      1: true,
      2: true,
      3: true,
    },
  },
};
export const postInfos = {
  postInfoCategory0: {
    userId: authUser573.uid,
    title: 'Bike Tour',
    location: {
      latitude: parseFloat(47.259906256212275),
      longitude: parseFloat(8.85051727294922),
    },
    category: '0',
  },
  postInfoCategory1: {
    userId: authUser123.uid,
    title: 'Farmer Market',
    location: {
      latitude: parseFloat(47.229335084944736),
      longitude: parseFloat(8.819577188716245),
    },
    category: '1',
  },
  postInfoCategory2: {
    userId: authUser123.uid,
    title: 'Pub Tour',
    location: {
      latitude: parseFloat(47.225774479140384),
      longitude: parseFloat(8.82056004429453),
    },
    category: '2',
  },
  postInfoShouldntMatch: {
    userId: authUser573.uid,
    title: 'Hiking',
    location: {
      latitude: parseFloat(47.131089623061605),
      longitude: parseFloat(8.745769426958764),
    },
    category: '0',
  },
  postInfoCloseToPinRadiusButShouldntMatch: {
    userId: authUser573.uid,
    title: 'Little Demo',
    location: {
      latitude: parseFloat(47.22410367930923),
      longitude: parseFloat(8.896822568367988),
    },
    category: '1',
  },
  postInfoWithinRadiusButNotSameCategoryShouldntMatch: {
    userId: authUser123.uid,
    title: 'Climbing Trip',
    location: {
      latitude: parseFloat(47.27316764014865),
      longitude: parseFloat(8.838633751936117),
    },
    category: '0',
  },
};

export const setUpPins = () => {
  savePin(
    pinInfos.pinInfoCategory02, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  savePin(
    pinInfos.pinInfoCategory1, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  savePin(
    pinInfos.pinInfoCategory0123, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
};

export const setUpPosts = () => {
  savePost(
    postInfos.postInfoCategory1, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  savePost(
    postInfos.postInfoCategory2, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  savePost(
    postInfos.postInfoCategory0, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  savePost(
    postInfos.postInfoShouldntMatch, () => { },
    (error) => { console.log('error'); console.log(error); },
  );
  savePost(
    postInfos.postInfoCloseToPinRadiusButShouldntMatch, () => { },
    (error) => { console.log('error'); console.log(error); },
  );
  savePost(
    postInfos.postInfoWithinRadiusButNotSameCategoryShouldntMatch, () => { },
    (error) => { console.log('error'); console.log(error); },
  );
};


export const setUpEverythingForUse = () => {
  setUpPins();
  setUpPosts();
};
