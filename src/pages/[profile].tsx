import { NextPage, NextPageContext } from 'next'
import * as React from 'react'
import ProfilePage, {
    IProfilePageProps,
} from '../components/organisms/ProfilePage'
import { withApollo } from '../lib/apollo'

const Profile: NextPage<IProfilePageProps> = ({ profile }) => {
    return (
        <React.Fragment>
            <ProfilePage profile={profile} />
        </React.Fragment>
    )
}

interface Context extends NextPageContext {
    query: {
        profile: string
    }
}

Profile.getInitialProps = async (context: Context) => {
    const profile: string = context.query.profile
    return { profile }
}

export default withApollo(Profile)
