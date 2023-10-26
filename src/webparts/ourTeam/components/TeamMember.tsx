/* eslint-disable @typescript-eslint/explicit-function-return-type */
/*eslint-disable @typescript-eslint/no-explicit-any  */
import React from 'react'
import styles from './styles/TeamMember.module.scss';
import { LivePersona } from "@pnp/spfx-controls-react/lib/LivePersona";
//import { Persona } from 'office-ui-fabric-react';

export interface ITeamMember {
  imageURL: string;
  name: string;
  designation: string;
  email: string;
  context: any;
}

const TeamMember = ({ imageURL, name, designation, email, context }: ITeamMember) => {
  return (
    <div className={`d-flex flex-column align-items-center ${styles.teamMember}`}>
    <LivePersona upn={email}
      template={
        

          <div className={`d-flex flex-column align-items-center`}>
            <img className={styles.teamMemberImage} src={imageURL} alt={name} />
            <h3 className={styles.teamMemberName} title={name}>{name}</h3>
          </div>
        }
      serviceScope={context.serviceScope}
    />
            <p className={styles.teamMemberDesignation} title={designation}>{designation}</p>
            {/* <p className={styles.teamMemberDesignation}>{email}</p> */}
            <a className={`${styles.teamMemberEmail}`} href={`mailto:${email}`}>
              {email}
            </a>




        </div>
      
  )
}

export default TeamMember;