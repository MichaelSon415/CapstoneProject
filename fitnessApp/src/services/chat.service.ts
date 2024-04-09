import { Injectable, Query } from '@angular/core';
import SendBird from 'sendbird';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import BadWords from 'bad-words';
@Injectable({
  providedIn: 'root',
})

export class ChatService {
  getCurrentUser() {
    throw new Error('Method not implemented.');
  }
  
  sb: any;
  // https://dashboard.sendbird.com
  private APP_ID: /*'6279D009-123D-4D17-B465-304E61CC270A';*/ string;
  private API_TOKEN: /*'7ae56f398121b13568a43ab2922cc7812946e434';*/ string;
  private baseSBURL: string;
  private endpoint = '.sendbird.com/v3/users';
  filter = new BadWords();

  constructor(private http: HttpClient) 
  { 
    this.APP_ID = environment.APP_ID;
    this.API_TOKEN = environment.API_TOKEN;
    this.baseSBURL = environment.baseSBURL;
  }

  init() {
    this.sb = new SendBird({ appId: this.APP_ID });
    SendBird.setLogLevel(SendBird.LogLevel.ERROR);
  }
  connect(userId: string, token: any, callback: any) {
    this.sb.connect(userId, token, (user: any, error: any) => {
      callback(user, error);
    });
  }



  private selectedChannel: SendBird.GroupChannel;
  setSelectedChannelName(channel: SendBird.GroupChannel) {

    this.selectedChannel = channel;
    //console.log(this.selectedChannel)
  }

  getSelectedChannelName() {
    return this.selectedChannel;


  }

  getChannelById(channelId: string, callback: any) {
    this.sb.GroupChannel.getChannel(channelId, (groupChannel: SendBird.GroupChannel, error: SendBird.SendBirdError) => {
      callback(error, groupChannel);
    });
  }

  isConnected() {
    return this.sb && this.sb.currentUser && this.sb.currentUser.userId;
  }

  getConnectedUser() {
    return this.sb && this.sb.currentUser ? this.sb.currentUser : null;
  }


  getMessageById(messageId: number, callback: any) {
    this.sb.getMessage(messageId, (message: SendBird.UserMessage | SendBird.AdminMessage, error: SendBird.SendBirdError) => {
      callback(error, message);
    });
  }


  createUser(user_id: string, nickname: string, profile_url: string): Observable<any> {
    const apiUrl = `https://api-6279D009-123D-4D17-B465-304E61CC270A.sendbird.com/v3/users` /*this.baseSBURL + this.API_TOKEN + this.endpoint*/; //does same thing as commeted line earlier
    const apiToken = this.API_TOKEN;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Token': apiToken
    });

    const body = {
      user_id: user_id,
      nickname: nickname,
      profile_url: profile_url
    };

    return this.http.post(apiUrl, JSON.stringify(body), { headers });
  }

  deleteUser(userId: string) {
    const url = `https://api-6279D009-123D-4D17-B465-304E61CC270A.sendbird.com/v3/users/${userId}` /*this.baseSBURL + this.API_TOKEN + this.endpoint + '/${userId}';*/ // Don't know if this works
    const apiToken = this.API_TOKEN;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Api-Token': apiToken
    });

    this.http.delete(url, { headers }).subscribe(
      (response) => {
        console.log('User deleted successfully', response);
      },
      (error) => {
        console.error('Failed to delete user', error);
      }
    );
  }

  registerEventHandlers(UNIQUE_HANDLER_ID: string, callback: any) {
    var channelHandler = new this.sb.ChannelHandler();
   
    channelHandler.onMessageReceived = (channel: any, message: any) => {
      callback({
        event: 'onMessageReceived',
        
        data: {
          channel,
          message,
        },
      });

    };

    channelHandler.onUserJoined = function (channel: any, user: any) {
      callback({
        event: 'onUserJoined',
        data: {
          channel,
          user,
        },
      });
    };

    channelHandler.onUserLeft = function (channel: any, user: any) {
      callback({
        event: 'onUserLeft',
        data: {
          channel,
          user,
        },
      });

    };


    // channelHandler.onMessageUpdated = function (channel, message) {};
    // channelHandler.onMessageDeleted = function (channel, messageId) {};
    // channelHandler.onMentionReceived = function (channel, message) {};
    // channelHandler.onChannelChanged = function (channel) {};
    // channelHandler.onChannelDeleted = function (channelUrl, channelType) {};
    // channelHandler.onChannelFrozen = function (channel) {};
    // channelHandler.onChannelUnfrozen = function (channel) {};
    // channelHandler.onMetaDataCreated = function (channel, metaData) {};
    // channelHandler.onMetaDataUpdated = function (channel, metaData) {};
    // channelHandler.onMetaDataDeleted = function (channel, metaDataKeys) {};
    // channelHandler.onMetaCountersCreated = function (channel, metaCounter) {};
    // channelHandler.onMetaCountersUpdated = function (channel, metaCounter) {};
    // channelHandler.onMetaCountersDeleted = function (channel, metaCounterKeys) {};
    // channelHandler.onChannelHidden = function (groupChannel) {};
    // channelHandler.onUserReceivedInvitation = function (groupChannel, inviter, invitees) {};
    // channelHandler.onUserDeclinedInvitation = function (groupChannel, inviter, invitee) {};
    // channelHandler.onUserJoined = function (groupChannel, user) {};
    // channelHandler.onUserLeft = function (groupChannel, user) {};
    // channelHandler.onDeliveryReceiptUpdated = function (groupChannel) {};
    // channelHandler.onReadReceiptUpdated = function (groupChannel) {};
    // channelHandler.onTypingStatusUpdated = function (groupChannel) {};
    // channelHandler.onUserEntered = function (openChannel, user) {};
    // channelHandler.onUserExited = function (openChannel, user) {};
    // channelHandler.onUserMuted = function (channel, user) {};
    // channelHandler.onUserUnmuted = function (channel, user) {};
    // channelHandler.onUserBanned = function (channel, user) {};
    // channelHandler.onUserUnbanned = function (channel, user) {};
    // channelHandler.onChannelMemberCountChanged = function (channels) {};
    // channelHandler.onChannelParticipantCountChanged = function (channels) {};

    // Add this channel event handler to the `SendBird` instance.
    this.sb.addChannelHandler(UNIQUE_HANDLER_ID, channelHandler);
  
}



 /*  async muteUser(channel: SendBird.GroupChannel, user: SendBird.User, callback: any) {

    
    channel.muteUser(user, (response: any, error: any) => {
      if (error) {
        console.error('Failed to mute user:', error);
        callback(error, null);
      } else {
        console.log('User muted successfully:', response);
        callback(null, response);
      }
    });
  } */

  
  createGroupChannel(
    channelName: string,
    userIds: Array<string>,
    callback: any
  ) {
    const params = new this.sb.GroupChannelParams();
    params.addUserIds();
    params.addUserIds(userIds);
    params.name = channelName;
    this.sb.GroupChannel.createChannel(
      params,
      (groupChannel: SendBird.GroupChannel, error: SendBird.SendBirdError) => {
        callback(error, groupChannel);
      }
    );
  }

  getMyGroupChannels(UserId: string, callback: any) {
    const listQuery = this.sb.GroupChannel.createMyGroupChannelListQuery(UserId);
    listQuery.includeEmpty = true;
    listQuery.memberStateFilter = 'joined_only';
    listQuery.order = 'latest_last_message';
    listQuery.limit = 15; // The value of pagination limit could be set up to 100.
    if (listQuery.hasNext) {
      listQuery.next((groupChannels: any, error: any) => {
        callback(error, groupChannels);
      });
    }
}

  getMessagesFromChannel(groupChannel: SendBird.GroupChannel, callback: any) {
    const listQuery = groupChannel.createPreviousMessageListQuery();
    listQuery.limit = 200; //no limit to messages
    listQuery.includeMetaArray = true;
    listQuery.includeParentMessageInfo = true;
    // Retrieving previous messages.
    listQuery.load((messages, error) => {
      callback(error, messages);
    });
  }

  //changes to get the conversations in real time
  getMessages(channel: SendBird.GroupChannel, callback: any) {
    const listQuery = channel.createPreviousMessageListQuery();
    listQuery.limit = 100; // Adjust the limit as needed.
    listQuery.reverse = true; // Get the latest messages first.
    listQuery.includeMetaArray = true;
    listQuery.includeParentMessageInfo = true;

    listQuery.load((messages, error) => {
      if (!error) {
        callback(messages, null);
      } else {
        callback(null, error);
      }
    });
  }

  sendMessage(
    channel: SendBird.GroupChannel | SendBird.OpenChannel,
    message: string,
    callback: any
  ) {
    const params = new this.sb.UserMessageParams();
    params.message = this.filter.clean(message);
    channel.sendUserMessage(params, (userMessage, error) => {
      callback(error, userMessage);
    });
  }

  inviteUser(channel: SendBird.GroupChannel, userIds: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      channel.inviteWithUserIds(userIds, (response: any, error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  getUser(){
    const currentUser = this.sb.currentUser;
    return currentUser;
  }

  createGlobalChat(
    channelName: string,
    userIds: Array<string>,
    callback: any
    ) {
    const params = new this.sb.GroupChannelParams();
    params.isPublic = true;
    params.isSuper = true;
    params.addUserIds(userIds);
    params.name = channelName;
    this.sb.GroupChannel.createChannel(
      params, 
      (groupChannel: SendBird.GroupChannel, error: SendBird.SendBirdError) => {
        callback(error, groupChannel);
      }
    );
  }

  getGlobalChat(): Promise<SendBird.GroupChannel> {
    const channelUrl = 'sendbird_group_channel_307767610_6d3786801c8ac0a1adc59639e47dcdad8fd73a89';
    return this.sb.GroupChannel.getChannel(channelUrl).then((channel: SendBird.GroupChannel) => {
      //console.log(channel);
      return channel;
    });
  }

  leaveChannel(channel: SendBird.GroupChannel, userId: string) {
    channel.leave().then(() => {
      console.log(`User with ID ${userId} has left the channel ${channel.name}`);
    }).catch((error) => {
      console.log('Error leaving channel', error);
    });
  }
  
  joinChannel(channel: SendBird.GroupChannel) {
    return new Promise((resolve, reject) => {
      // Use the SendBird SDK method to join the channel
      this.sb.OpenChannel.getChannel(channel.url, (openChannel: any, error: any) => {
        if (error) {
          reject(error);
        } else {
          openChannel.enter((response: any, error: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          });
        }
      });
    });
  }
}

