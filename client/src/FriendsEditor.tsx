// TODO: Implement FriendsEditor
import React, { Component } from "react";
import { USERS } from './users';
import { Friends } from "./friends";

type FriendsEditorProps = {
  user: string;
  friends: Friends;
  onFriendClick: (friends: Friends) => void;
};

type FriendsEditorState = {
  friendsList: Array<JSX.Element>;
};

export class FriendsEditor extends Component<FriendsEditorProps, FriendsEditorState> {
  constructor(props: FriendsEditorProps) {
    super(props);

    this.state = { 
        friendsList: this.doFriendListChange() 
    };
  }

  componentDidUpdate = (prevProps: FriendsEditorProps): void => {
    if (prevProps.friends !== this.props.friends) {
      this.setState({ 
        friendsList: this.doFriendListChange() 
      });
    }
  };

  doFriendListChange = (): Array<JSX.Element> => {
    const users: string[] = [];
  
    for (const user of USERS) {
      if (user !== this.props.user) {
        users.push(user);
      }
    }
  
    const list: Array<JSX.Element> = [];
    for (const user of users) {
      list.push(
        <div className="friend" key={user}>
          {user}
          {this.props.friends.includes(user) ? (
            <button className="unfriend" onClick={() => this.doFriendClick(user)}>
              Unfriend
            </button>) : 
            (<button className="friend" onClick={() => this.doFriendClick(user)}>
              Friend
            </button>
          )}
        </div>
      );
    }
  
    return list;
  };

  doFriendClick = (user: string): void => {
    if (!this.props.friends.includes(user)) {
      this.props.onFriendClick(this.props.friends.concat(user));
    } else {
      const newFriends: Friends = [];
      for (const friend of this.props.friends) {
        if (friend !== user) {
          newFriends.push(friend);
        }
      }
      this.props.onFriendClick(newFriends);
    }
  };

  render = (): JSX.Element => {
    return (
      <div>
        Check those users who are your friends:
        {this.state.friendsList}
      </div>
    );
  };
}