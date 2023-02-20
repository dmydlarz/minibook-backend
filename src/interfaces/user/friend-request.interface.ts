import { FriendRequestState } from '../../core/shared/enums/friend-request-state.enum';

export interface IFriendRequestState {
  status?: FriendRequestState;
}

export interface IFriendRequest {
  id: number;
  creatorId: number;
  receiverId: number;
  status: IFriendRequestState;
}
