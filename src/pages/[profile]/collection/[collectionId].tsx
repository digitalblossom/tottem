import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Box } from 'grommet'
import { LinkPrevious } from 'grommet-icons'
import countBy from 'lodash.countby'
import { NextPage, NextPageContext } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import * as React from 'react'
import removeMd from 'remove-markdown'
import styled from 'styled-components'
import CollectionHeader from '../../../components/organisms/CollectionHeader'
import ItemList, {
    ItemListPlaceholder,
} from '../../../components/organisms/CollectionDetails'
import { Layout, PageBox } from '../../../components/templates/Layout'
import {
    CollectionPageFragment,
    ICollection,
    Item,
    User,
} from '../../../fragments/collection'
import { ItemType } from '../../../fragments/common'
import { withApollo } from '../../../lib/apollo'

interface ICollectionProps {
    profile: string
    collectionId: string
}

const BackButton = styled.a`
    display: flex;
    background-color: white;
    cursor: pointer;
    color: black;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0px;
    left: -32px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    @media screen and (max-width: 600px) {
        display: none;
    }
`
const collectionQuery = gql`
    query getCollectionPage($slug: String, $collectionId: String) {
        user(where: { slug: $slug }) {
            ...UserCollectionPage
        }
        collection(where: { slug: $collectionId }) {
            ...CollectionCollectionPage
        }
    }
    ${CollectionPageFragment.collection}
    ${CollectionPageFragment.user}
`

interface CollectionQuery {
    user: User
    collection: ICollection
}

interface CollectionVars {
    slug: string
    collectionId: string
}

const Collection: NextPage<ICollectionProps> = ({ profile, collectionId }) => {
    const isBrowser = typeof window !== 'undefined'
    const { error, data } = useQuery<CollectionQuery, CollectionVars>(
        collectionQuery,
        {
            ssr: true,
            returnPartialData: isBrowser,
            variables: {
                slug: profile,
                collectionId,
            },
        }
    )

    if (
        data === undefined ||
        data.collection === undefined ||
        data.user === undefined
    ) {
        return <div>Loading</div>
    }

    const { collection, user } = data
    const collectionName = removeMd(collection.name)
    const itemsTypeCount = countBy(collection.items, (x: Item) => x.type)

    return (
        <Layout>
            <NextSeo
                title={`${collectionName} - ${user.firstname} - Tottem`}
                description={`${collectionName} by ${user.firstname} - Tottem`}
                twitter={{
                    site: '@TottemApp',
                    cardType: 'summary',
                }}
                openGraph={{
                    description: `${collectionName} by ${user.firstname} - Tottem`,
                    url: `https://tottem.app/${profile}/collection/${collection.slug}`,
                    site_name: 'Tottem',
                    images: [
                        {
                            url: `https://tottem.app${user.pictureUrl}`,
                        },
                    ],
                }}
            />
            <PageBox>
                {collection.section && (
                    <Link
                        href="/[profile]/[sectionId]"
                        as={`/${profile}/${collection.section.slug}`}
                        passHref
                    >
                        <BackButton>
                            <LinkPrevious
                                color="#595959"
                                style={{ margin: 'auto', display: 'block' }}
                            />
                        </BackButton>
                    </Link>
                )}
                <Box width="xlarge">
                    <CollectionHeader
                        ownerName={user.firstname}
                        userImage={user.pictureUrl}
                        title={collectionName}
                        subtitle={collection.detail || ' '}
                        date={collection.date.toString()}
                        ownerSlug={user.slug}
                        itemsTypeCount={
                            itemsTypeCount as { [type in ItemType]: number }
                        }
                    />
                    {collection.items === undefined ? (
                        <ItemListPlaceholder />
                    ) : (
                        <ItemList items={collection.items} />
                    )}
                </Box>
            </PageBox>
        </Layout>
    )
}

interface Context extends NextPageContext {
    query: {
        profile: string
        collectionId: string
    }
}

Collection.getInitialProps = async (context: Context) => {
    const profile: string = context.query.profile
    const collectionId: string = context.query.collectionId
    return { profile, collectionId }
}

export default withApollo(Collection)
