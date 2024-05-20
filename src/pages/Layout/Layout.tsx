import React, { useState } from 'react';
import clsx from "clsx"
import { Box, IconButton, Drawer, List } from '@mui/material';
import {
    createStyles, makeStyles
} from '@mui/styles';
import {
    useNavigate
} from 'react-router-dom';

import { Menu } from '@mui/icons-material';
import { menuContent } from '../../components/data';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import mainLogo from '../../assets/images/logo.jpg';
import closeIcon from '../../assets/images/closeIcon.png';

import searchIcon from '../../assets/images/search.svg';
import shopIcon from '../../assets/images/shop.png';
import userIcon from '../../assets/images/user.png';
import heartIcon from '../../assets/images/heart.png';
import giftIcon from '../../assets/images/gift.png';
import shoppingBagIcon from '../../assets/images/shoppingbag.png';

import './layout.css';

const useStyles = makeStyles((theme: any) =>
    createStyles({
        dropdownContent: {
            display: 'none',
            position: 'absolute',
            backgroundColor: 'transparent',
            width: '80%',
            paddingRight: '2rem',
            paddingLeft: '2rem',
            left: '10%',
            zIndex: 1,
            paddingTop: '2rem',
            borderRadius: '0.5rem',
        },
        dropdownContentOpen: {
            display: 'block',
        },

        row: {
            display: 'flex',
            '&::after': {
                content: '""',
                display: 'table',
                clear: 'both',
            },
        },
       
    })
);

interface Props {
    children: JSX.Element[] | JSX.Element
}

const Layout = (
    { children }: Props
) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [presentIndex, setPresentIndex] = useState(0);

    const handleMouseEnter = (index: number) => {
        setDropdownOpen(true);
        setPresentIndex(index)
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    const classes = useStyles();
    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState);
    };
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleExpand = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <React.Fragment>

            <Box className='flex'>
                <div className='w-screen xl:w-full bg-white right-0 left-0 top-0'>
                    <div className='flex h-16 max-w-8xl w-4/5 xl:w-4/5 md:w-full xs:w-full mr-auto ml-auto px-8 py-2 xl:px-8 lg:px-2 md:px-2 xs:px-2 justify-between items-center'>
                        <img src={mainLogo} className='h-14 lg:w-40 xs:w-36'></img>
                        <div className='flex gap-4 items-center xs:gap-2'>
                            <img src={searchIcon} className='h-[30px] w-[30px]'></img>
                            <img src={shopIcon} className='h-[30px] w-[30px] xs:hidden sm:hidden md:block'></img>
                            <img src={userIcon} className='h-[30px] w-[30px] xs:hidden sm:hidden md:block'></img>
                            <img src={heartIcon} className='h-[30px] w-[30px] xs:hidden sm:hidden md:block'></img>
                            <img src={giftIcon} className='h-[30px] w-[30px] xs:hidden sm:hidden md:block'></img>
                            <img src={shoppingBagIcon} className='h-[30px] w-[30px]'></img>
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                edge='start'
                                onClick={handleDrawerToggle}
                                sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'none', xl: 'none' }, }}
                            >
                                <Menu />
                            </IconButton>
                        </div>
                    </div>
                    <div className='flex h-32 max-w-8xl w-4/5 align-bottom justify-between overflow-hidden transition-all ease-in px-8 py-4 mr-auto ml-auto xs:hidden sm:hidden md:hidden lg:hidden xl:flex'>
                        {
                            menuContent.map((item, index) => {
                                const MenuIcon = item.icon;
                                return <div
                                    key={index}
                                    className='float-left overflow-hidden bg-stone-100 h-full rounded-lg w-24 hover:bg-stone-200 group'
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button className='flex items-center flex-col justify-around text-base border-none outline-none text-neutral-500 px-4 py-2.5 w-full h-full'>
                                        <MenuIcon />
                                        <span className="text-[14px] font-medium leading-tight tracking-tight text-gray-600 group-hover:text-pink-500">{item.title}</span>
                                    </button>
                                    {
                                        presentIndex == index &&
                                        <div className={clsx(classes.dropdownContent, dropdownOpen ? classes.dropdownContentOpen : null)}>
                                            <div className='grid grid-rows-[4fr_1fr] w-full min-h-[450px] bg-gray-200 rounded-lg p-4 gap-4'>
                                                <div className='grid grid-cols-[3fr_1fr]'>
                                                    <div>
                                                        <div className='p-4 text-pink-500 font-semibold text-lg'>
                                                            <h2>{item.title}</h2>
                                                        </div>
                                                        <div className={classes.row}>
                                                            <div className='float-left p-2.5 md:w-full md:h-auto'>
                                                                {
                                                                    item.extraMenu?.map((extraMenuitem) => (
                                                                        <a key={extraMenuitem} className='float-none p-2.5 px-1.5 no-underline block text-left text-sm text-gray-500 hover:bg-gray-300' href="#">{extraMenuitem}</a>
                                                                    ))
                                                                }
                                                            </div>
                                                            {
                                                                item.mainMenu.map((menuItem) => (
                                                                    <div key={menuItem} className='float-left p-2.5 md:w-full md:h-auto'>
                                                                        <h3 className='text-sm font-medium text-pink-500'>{menuItem}</h3>
                                                                        {
                                                                            item.subMenu.filter((item) =>
                                                                                item.header == menuItem)[0]?.details.map((detailList) => (
                                                                                    <a key={detailList} className='float-none p-2.5 px-1.5 no-underline block text-left text-sm text-gray-500 hover:bg-gray-300' href="#" >{detailList}</a>
                                                                                ))
                                                                        }

                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <img src={item.image} className='w-full h-full border-3 border-image-border-pink' ></img>
                                                </div>
                                                <div className='flex flex-col justify-end'>
                                                    <div className='p-1.5 text-pink-500 font-medium text-base'>Popular Brands in {item.title}</div>
                                                    <div className='flex gap-2'>
                                                        {
                                                            item.logo.map((item) =>
                                                                <img src={item} className='filteredImage'></img>
                                                            )
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>;
                            })
                        }
                    </div>
                </div>
                <Box component="nav">
                    <Drawer
                        anchor='left'
                        container={document.body}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                            },
                        }}
                    >
                        <Box
                            className='text-left'
                        >
                            <div className='h-16 border-b border-gray-700 flex justify-between pl-2 pt-2 pb-2 pr-6 items-center'>
                                <img src={mainLogo} className='h-full w-36' onClick={() => {
                                    navigate('/');
                                }} />
                                <img src={closeIcon} className='h-5 w-5' onClick={handleDrawerToggle} />
                            </div>
                            <div className='mobile'>
                                <List >
                                    {
                                        menuContent.map((item, index) => (
                                            <Accordion expanded={expanded === `panel-${[index]}`} onChange={handleExpand(`panel-${[index]}`)}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                    className='flex flex-row gap-4'
                                                >
                                                    <div key={index} className='px-8 py-1 group flex items-center gap-4 hover:bg-gray-100'>
                                                        <item.icon />
                                                        <div className='text-[15px] font-medium leading-tight tracking-tight text-gray-600 transition-all duration-75 group-hover:text-pink-500'>{item.title}</div>
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails className='flex justify-between xs:flex-col xxs:flex-row'>
                                                    <div className='flex flex-col'>
                                                        {
                                                            item.extraMenu.map((item) => (
                                                                <div className='float-none p-1.5 no-underline block text-left text-sm text-gray-500 hover:bg-gray-300'>{item}</div>
                                                            ))
                                                        }
                                                        {
                                                            item.mainMenu.map((item) => (
                                                                <div className='text-md p-1.5 font-semibold text-pink-500 hover:bg-gray-300'>{item}</div>
                                                            ))
                                                        }
                                                    </div>
                                                    <img src={item.image} className='w-48 h-48 border-3 border-image-border-pink sm:w-48 sm:h-48 xs:w-36 xs:h-36'></img>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))
                                    }
                                </List>
                            </div>
                        </Box>
                    </Drawer>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export { Layout };
