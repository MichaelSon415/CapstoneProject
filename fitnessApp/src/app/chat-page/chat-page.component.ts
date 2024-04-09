import { Component, ElementRef, ViewChild, ChangeDetectorRef, EventEmitter, Renderer2, Inject, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import SendBird from 'sendbird';
import { environment } from 'src/environments/environment.development';
import { StorageService } from '../storage.service';
import { GetToken } from 'src/utilFunctionTokenService.service';
import { Location } from '@angular/common';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  messageAlert: string;
  name: string;
}

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  /* standalone: true,
  imports: [MatButtonModule, MatBottomSheetModule], */
  styleUrls: ['./chat-page.component.css', '../../assets/Stylesheet/mainbox.css']
})
export class ChatPageComponent {
  
  title = 'myapp';
  

  connected = false;
  listConversationsResult: string | null;
  globalChannel: SendBird.GroupChannel;
  selectedChannel: SendBird.GroupChannel;
  messages: Array<SendBird.UserMessage> | null;
  startConversationResult: string;
  conversations: Array<SendBird.GroupChannel> | null;
  textMessage: any;
  userId: string;
  API_Token: string;
  userName: string;
  joinUserIds: string[];
  messageText: string = '';
  selectedChannelName: string;
  userClick: string = ';'
  alert = "you cant"
  @ViewChild('messageList') private messageList: ElementRef;
  private scrollContainer: any;
  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef, private route: ActivatedRoute,
    private _bottomSheet: MatBottomSheet, private storageService: StorageService, private getToken: GetToken, private router: Router,
    private renderer: Renderer2, private location: Location, public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      this.changeConversation();
    });
    this.API_Token = environment.API_TOKEN;
  }
  
  //here
  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  bottomSheetRef.instance.selectedOptionEmitter.subscribe(async (selectedOption: string) => {
    console.log('Selected option:', selectedOption);
    
    this.selectedChannel.muteUser(this.chatService.getUser(),parseInt(selectedOption),'UserMuted')

    /* this.chatService.muteUser(this.selectedChannel, this.chatService.getUser(), (error: any, response: any) => {
      if (!error) {
        // Handle success
        console.log('User muted successfully:', response);
      } else {
        // Handle error
        console.error('Failed to mute user:', error);
      }
    }); */
    
  });

  }







 

  ngOnInit() {
    console.log("Initializing chat page component...");
    //this.chatService.init();
    //changes to get the conversations in real time
    this.changeConversation();
    const token = this.storageService.getTokenValue();
    this.userName = this.getToken.getUserNameFromToken(token) || '0';
    this.userId = this.getToken.getUserIdFromToken(token) || '0';
    this.cdr.detectChanges(); 
    this.scrollToBottom(); 
  }

  changeConversation() {
    //this.connect();
    this.registerEventHandlers();
    this.getMyConversations();
    this.getMessages(this.chatService.getSelectedChannelName());
  }

  
  connect() {
    this.chatService.connect(this.userId, null, (error: any, user: any) => {
      if (!error) {
        this.connected = true;
      }
    });

  }

  createUser() {
    this.chatService.createUser(this.userId, this.userName, '').subscribe(
      response => {
        console.log('User created successfully:', response);
        // Handle the response or perform any additional actions
      },
      error => {
        console.error('Error creating user:', error);
      }
    );
    this.chatService.getGlobalChat().then((channel: SendBird.GroupChannel) => {
      this.globalChannel = channel;
      this.joinUserIds = [this.userId];
      console.log(this.joinUserIds, this.globalChannel)
      this.chatService.inviteUser(this.globalChannel, this.joinUserIds)
      .then(response => {
        console.log('Users invited successfully:', response);
      })
      .catch(error => {
        console.error('Failed to invite users:', error);
      });
    }).catch((error: any) => {
      // Handle any errors that occur during the retrieval
      console.error('Failed to retrieve global chat:', error);
    });
  }

  deleteUser() {
    this.chatService.deleteUser(this.userId)
  }

  registerEventHandlers() {
    this.chatService.registerEventHandlers(
      '123',
      (data: { event: string; data: any }) => {
        console.log('New event: ' + data.event, data.data);
        if (this.selectedChannel) {
          if (data.event == 'onMessageReceived' && this.messages) {
            if (data.data.channel.url == this.selectedChannel.url) {
              this.messages.push(data.data.message);
              this.cdr.detectChanges();
              this.scrollToBottom();
            }
          } 
          else if (data.event == 'onUserJoined') {
            alert(`User joined: ${data.data.user.nickname}`);
        }
  
        
        else if (data.event == 'onUserLeft') {
          alert(`User left: ${data.data.user.nickname}`);
      }
        }
       
      });
    }


    chatUser(userClicked: string, username: string): void{
      console.log(`Clicked on user: ${userClicked}`);
      this.joinUserIds = [userClicked]
      if(this.userId === userClicked){
        /* alert("You can't chat with yourself!") */
        this.openDialog();
      }
      else{
        this.userClick = username;
        this.startConversation();
        window.location.reload();
      }
      
      

    }


    @ViewChild('scroll', {static: false}) scroll: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {name: this.userName, messageAlert: ""}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.alert = " ";
      });
    }

   

    startConversation() {
      let chatUserNames: string[] = [];
      for (var userId of this.joinUserIds) {
        fetch(`https://api.sendbird.com/v3/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': environment.API_TOKEN, // Replace with your Sendbird API token
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const username = data.nickname; // Retrieve the username from the response
          console.log(`Username for user ${userId}: ${username}`);
          chatUserNames.push(username);
        })
        .catch((error) => {
          console.error('Error retrieving user:', error);
        });
      }
      let channelName = this.userName.toString() + " - " + this.userClick.toString();
      let userIds = this.joinUserIds;
      userIds.push(this.userId);
      this.chatService.createGroupChannel(
        channelName,
        userIds,
        (error: SendBird.SendBirdError, groupChannel: SendBird.GroupChannel) => {
          if (error) {
            this.startConversationResult = 'Error creating the conversation';
          } else {
            this.startConversationResult = 'Conversation created';
            this.getMyConversations();
          }
        }
      );
    }

  profilePage(){
    this.router.navigate(['navbar/socialpage']);
  }

  reportChat(){
    this.router.navigate(['navbar/contactus']);
  }

  settingPage(){
    this.router.navigate(['navbar/account']);
  }
  getMyConversations() {
    this.chatService.getMyGroupChannels(this.userId,
      (
        error: SendBird.SendBirdError,
        groupChannels: Array<SendBird.GroupChannel>
      ) => {
        if (error) {
          this.listConversationsResult = 'Unable to get your conversations';
        } else {
          this.conversations = groupChannels;
        }
      }
    );

  }


  getMessages(channel: SendBird.GroupChannel) {
    this.selectedChannel = channel;
    this.selectedChannelName = channel.name;
    this.chatService.getMessagesFromChannel(
      channel,
      (
        error: SendBird.SendBirdError,
        messages: Array<
          SendBird.UserMessage 
        >
      ) => {
        if (!error) {
          this.messages = messages;
          this.cdr.detectChanges();
          this.scrollToBottom(); 
        }
      }
    );
  }

  updateTextMessage(event: any) {
    const value = event.target.value;
    if (!value || !this.selectedChannel) {
      return;
    }
    this.textMessage = value;
  }

  sendMessage() {
    this.chatService.sendMessage(
      this.selectedChannel,
      this.textMessage,
      (error: SendBird.SendBirdError, userMessage: SendBird.UserMessage) => {
        this.getMessages(this.selectedChannel);
        this.messageText = ''; // Clear the input text
        this.cdr.detectChanges(); 
        this.scrollToBottom(); 
        setTimeout(() => {
          this.scroll.nativeElement.scrollTo(0, this.scroll.nativeElement.scrollHeight);
        }, 0);
      }
    );
  }
  ngAfterViewInit() {
    this.scrollContainer = this.scroll.nativeElement;  
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());    
  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  /* scrollToBottom() {
    if (this.messageList) {
      const element = this.messageList.nativeElement;
      this.renderer.setProperty(element, 'scrollTop', element.scrollHeight);
    }
  } */
  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      /* behavior: 'smooth' */
    });
  }

  formatTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    const monthAbbreviation = date.toLocaleString('default', { month: 'short' });
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const time = `${hours}:${minutes}`;
    const ampm = date.getHours() < 12 ? 'am' : 'pm';
    const formattedTimestamp = `${monthAbbreviation}. ${day} ${year} | ${time}${ampm}`;
    return formattedTimestamp;
  }

  leaveChannel() {
    this.chatService.leaveChannel(this.selectedChannel, this.userId);
  }

  createGlobalChat() {
    let channelName = "Global Chat";
    let userIds = ['899353'];
    this.chatService.createGlobalChat(
      channelName,
      userIds, 
      (error: SendBird.SendBirdError, groupChannel: SendBird.GroupChannel) => {
        if (error) {
          console.error('Error creating supergroup:', error);
        } else {
          console.log('Supergroup created:', groupChannel);
        }
      }
    );
  }
}



//here
@Component({
  selector: 'chat-page-sheet',
  templateUrl: 'chat-page-sheet.component.html',
  standalone: true,
  imports: [MatListModule],
})
export class BottomSheetOverviewExampleSheet {

  selectedOptionEmitter = new EventEmitter<string>();
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(option: string): void {
    this.selectedOptionEmitter.emit(option);
    this._bottomSheetRef.dismiss();

    //event.preventDefault();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}