import * as React from 'react';
// import styles from './OurTeam.module.scss';
import { IOurTeamProps } from './IOurTeamProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import TeamContainer from './TeamContainer';
import "../../../common/styles/bootstrap.css";
import "../../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../common/fonts/fonts.scss";

export default class OurTeam extends React.Component<IOurTeamProps, {}> {
  public render(): React.ReactElement<IOurTeamProps> {

    return (
        <>
          <TeamContainer _baseurl={this.props.baseurl} listid={this.props.listid} spcontext={this.props.spcontext}/>
        </>
    );
  }
}
