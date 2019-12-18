import * as React from 'react'
import TopBar from '../../components/TopBar2'
import Sidenav from './Sidenav'
import { AuthenticatedUser } from '../../services/authentication'

export default ({ loggedInUser }: { loggedInUser: AuthenticatedUser }) => {
    return (
        <div className="flex h-screen text-sm">
            <Sidenav authUserId={loggedInUser.id} />
            <div className="flex flex-1 flex-col">
                <TopBar
                    avatar={loggedInUser.picture}
                    username={loggedInUser.name}
                />
                <div className="flex-1 text-sm">Archived Bar</div>
            </div>
        </div>
    )
}