import * as E from './../../store/entity';
import * as S from './../../store/state';
import * as Store from './../../store/store';
import { PostBucketIDB } from './../../idb/index';

export interface UseCase extends Store.UseCase { }

export interface IAppState extends S.IState { }

export namespace Entity {
    export interface IProject extends E.IProject { }
    export interface ITopic extends E.ITopic { }
    export interface IPost extends E.IPost { }
    export interface IRoute extends E.IRoute { }
}

export namespace IDB {
    export interface Instance extends PostBucketIDB { }
}