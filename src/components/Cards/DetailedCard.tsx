import React from 'react'
import { Box, Text, Paragraph, Button, Markdown } from 'grommet'
import { Share } from 'grommet-icons'
import { Item } from '../../types'

const DetailedCard: React.FC<Item> = props => {
    return (
        <Box
            responsive={false}
            direction="column"
            justify="between"
            background="brand"
            round="8px"
            pad={{
                horizontal: 'small',
                top: 'small',
                bottom: 'medium',
            }}
            fill="vertical"
        >
            <Box>
                <Box
                    border={{ side: 'bottom', size: '0.5px', color: 'light-6' }}
                >
                    <Text
                        color="white"
                        size="small"
                        margin={{ top: '0px', bottom: 'small' }}
                    >
                        <strong> {props.title}</strong>
                    </Text>
                </Box>
                <Box>
                    <Paragraph size="small" color="white">
                        <Markdown>
                            {props.note ? props.note : 'No details'}
                        </Markdown>
                    </Paragraph>
                </Box>
            </Box>

            <Box direction="row" align="center" justify="center">
                <Button
                    reverse={true}
                    fill="horizontal"
                    icon={<Share color="white" size="small" />}
                    label="Get it"
                    href={props.productUrl}
                    target="_blank"
                />
            </Box>
        </Box>
    )
}

export default DetailedCard
