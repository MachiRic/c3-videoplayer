import React, { Component } from 'react';
import YouTube from 'react-youtube';
import PubNub from 'pubnub';
import logo from './hivaLogo.png';

var pubnub = null;

class Datamodel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            status: "",
            opts: {
                height: '1000',
                width: '1450',
                playerVars: { // https://developers.google.com/youtube/player_parameters
                    autoplay: 1
                }
            }
        }
    }

    componentDidMount = () => {
        console.log("Monteras!")
        console.log(this.state.queue)
        //this.getUpdatePubnub();
        if (pubnub == null) {
            console.log("skapar pubnub");
            pubnub = new PubNub({
                subscribeKey: "sub-c-ff0c5120-7702-11e9-945c-2ea711aa6b65",
                publishKey: "pub-c-ab1f1896-d4ac-4b70-aaf4-ca968c88c2f5",
                secretKey: "sec-c-NjI1MjhlNDEtNmEwYi00NjNmLWJkYTgtNDYwNzFhZDBkNmQz",
                ssl: true,
            });

            pubnub.subscribe({
                channels: ["Queue"],
                withPresence: true
            });

            pubnub.addListener({
                message: (m) => {
                    console.log(m.message)
                    if (m.publisher != pubnub.getUUID()) {
                        if (m.message.action == "add") {
                            this.setState({ queue: [...this.state.queue, m.message.item] })
                        }
                        else if (m.message.action == "remove") {
                            this.setState({ queue: this.state.queue.filter(i => i.id != m.message.item.id) })
                        }
                    }
                }
            })
        }
    }

    componentDidUpdate = () => {
        console.log("uppdaterar!")
        console.log(this.state.queue)
    }

    _onStateChange = (event) => {
        console.log(event.data)
        if (event.data == 0) {
            console.log("Video ended")
            console.log(this.state.queue[0].id)
            pubnub.publish({
                message: {
                    action: 'remove',
                    item: this.state.queue[0].id
                },
                channel: 'Queue'
            });

            if (this.state.queue.length > !2) {
                this.setState({ queue: this.state.queue.slice(1) })

            }
        }
    }

    render = () => {
        let content = "";
        if (this.state.queue.length < 1) {
            content = <div>
                <img src={logo} alt="logo" />
                <h1>The queue is empty</h1>
                <h3>Use the hiva app to add media to the queue!</h3></div>
        }
        else {
            console.log("Ska visa video but problems you know...")
            console.log("Objektet som ska visas: ", this.state.queue[0].youtubeId)
            let videoId = this.state.queue[0].youtubeId;
            console.log(videoId)
            content = <YouTube
                videoId={videoId}
                opts={this.state.opts}
                onStateChange={this._onStateChange}
            />
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default Datamodel;