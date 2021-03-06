import React from 'react';
import Project from "../routes/project";
import SetRepo from '../routes/setRepo'
import Header from "./header";

import * as style from '../style/app.module.css'
import { Grid, Heading } from 'grommet';
import { AppContextInterface, AppContextProvider } from '../models/context';
import { Commit } from '../models/commitNode';

export default class App extends React.Component<{}, AppContextInterface> {
    // public currentUrl?: string;
    // public handleRoute = (e: RouterOnChangeArgs) => {
    //     this.currentUrl = e.url;
    // };
    private DefaultAppContext = {
        repoName: "",
        repoOwner: "",
        branch: "master",
        currentTab: 0
    }

    constructor(props: {}) {
        super(props)
        this.state = {
            ...this.DefaultAppContext,
            setCommit: this._setCommit,
            setTab: this._setTab,
            setRepo: this._setRepo
        }
    }

    public render() {
        return (
            <AppContextProvider value={this.state}>
                <div id={style.app}>
                    <Grid
                        columns={["full"]}
                        rows={["xxsmall", "40px", "flex"]}
                        areas={[
                            { name: "appbar", start: [0,0], end: [0,0] },
                            { name: "repo", start: [0,1], end: [0,1] },
                            { name: "project", start: [0,2], end: [0,2] }
                        ]}
                        style={{overflow: "hidden", maxHeight: "100vh", minHeight: "100vh"}}
                        gap="small"
                    >
                        <Header />
                        {this.state.repoName === "" || this.state.repoOwner === "" ?
                            <SetRepo />
                        :
                            <>
                            <Heading level="2" gridArea="repo" margin={{left: "10px", top: "15px", bottom: "0"}}>{`${this.state.repoOwner}/${this.state.repoName}`}</Heading>
                            <Project />
                            </>
                        }
                    </Grid>
                </div>
            </AppContextProvider>
        );
    }

    private _setCommit = (commit: Commit | null) => {
        this.setState({
            currentCommit: commit,
            currentTab: 1
        })
    }

    private _setTab = (tab: number) => {
        this.setState({
            currentTab: tab
        })
    }

    private _setRepo = (owner: string, name: string) => {
        this.setState({
            repoName: name,
            repoOwner: owner
        })
    }
}
