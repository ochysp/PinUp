// @flow

export type AuthUserType = {
  uid: string,
  displayName: string,
  email: string,
  photoURL: ?string,
};

export type Error = {
  name: string;
  message: string;
  stack?: string;
}

export type SnapshotType = {
  val: () => any
};

export type KeyType = string;

export type LocationType = {
  latitude: number,
  longitude: number
};

export type AreaType = {
  location: LocationType,
  radius: number
};

export type PinInfoType = {
  pinId?: KeyType,
  userId?: KeyType,
  title?: string,
  area: AreaType
};

export type EventType = {
  date: Date,
  participants: { [KeyType]: boolean }
};

export type PostInfoWithLocationType = {
  postId?: KeyType,
  userId: KeyType,
  title: string,
  location: LocationType,
  event?: EventType
};

export type PostInfoWithoutLocationType = {
  postId?: KeyType,
  userId: KeyType,
  title: string,
  event?: EventType
};

export type DetachFunction = () => void;

export type ConnectionType = {
  detach: DetachFunction
};

export type KeyChangedCallback = (key: KeyType) => void;

export type ValueQueryCallback = (snapshot: SnapshotType) => void;

export type GeoQuerryCallback = (key: KeyType,
                                 location: [number, number],
                                 distance: number) => void;

export type SuccessCallback = (data: any) => void;

export type ErrorCallback = (error: Error) => void;

