import React, { useEffect, useState } from 'react';
import {
    Container
} from '@mui/material';

import {
    createStyles, makeStyles
} from '@mui/styles';

const useStyles = makeStyles((theme: any) =>
    createStyles({
        root: {
            color: 'white !important',
            display: 'flex !important',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 64px)',
            [theme.breakpoints.down('sm')]: {
                padding: '0 !important'
            }
        },
    })
);



const Home = () => {

    const classes = useStyles();
    /**
     *
     * @param varaibales
     */

    return (
        <Container className={classes.root}>
                
        </Container>
    );
};

export { Home };
