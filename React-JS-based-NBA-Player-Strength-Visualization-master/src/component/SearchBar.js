import React, { Component } from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constant'

const Option = AutoComplete.Option;

export class SearchBar extends Component {
    state = {
        dataSource: [],
    };

    handleSearch = value => {
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(
                ({ fullName, playerId }) => (
                    <Option key={playerId} value={fullName}>
                        <img
                            className="player-option-image"
                            src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
                            alt={fullName}
                        />
                        <span className="player-option-label">
                            {fullName}
                        </span>
                    </Option>
                )
            )
        });
    };

    onSelect = (value, {key: playerId}) => {
        console.log(value);
        this.props.loadPlayerInfo(playerId);
    }

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                dataSource={dataSource}
                className="search-bar"
                size="large"
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                optionLabelProp="value"
                placeholder="Search NBA Player"
            >
                <Input suffix={<Icon type="search" />} />
            </AutoComplete>
        );
    }
}