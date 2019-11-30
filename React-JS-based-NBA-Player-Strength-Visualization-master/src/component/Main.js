import React, { Component } from 'react';
import nba from 'nba';
import { Profile } from "./Profile";
import { DataViewContainer } from './DataViewContainer';
import { SearchBar } from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constant';
import { Spin } from 'antd';


export class Main extends Component {
    state = {
        isLoading: false,
        playerInfo: DEFAULT_PLAYER_INFO
    }

    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.playerId);
    }

    loadPlayerInfo = (playerId) => {
        this.setState(
            {
                isLoading: true
            }
        );

        nba.stats.playerInfo({ PlayerID: playerId })
            .then((info) => {
                const playerInfo = Object.assign({},
                    info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                this.setState({ playerInfo, isLoading: false });
            })
            .catch((e) => {
                console.log(e);
                this.setState({ isLoading: false })
            });
    }

    render() {
        return (
            <div className="main">
                <SearchBar loadPlayerInfo={this.loadPlayerInfo} />
                {
                    this.state.isLoading ? <div><Spin tip="Loading..." /></div> : (
                        <div className="player">
                            <Profile playerInfo={this.state.playerInfo} />
                            <DataViewContainer playerId={this.state.playerInfo.playerId} />
                        </div>
                    )
                }
            </div>
        );
    }
}