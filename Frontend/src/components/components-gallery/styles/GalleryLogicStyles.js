import { Box } from "@mui/material";

const menuBoxStyle={
    display:'block',
    width:'21%',
    height:'100%',
    minWidth:'10em',
    maxWidth:'30em',
    bgcolor:'background.paper',
    border:'1px solid black'
}

export const styled={
    GalleryPageContainer:({children})=>(
        <Box 
            display='flex'
            width='100%' height='100%'
            position='relative'
        >
            {children}
        </Box>
    ),
    MenuBox:({children})=>(
        <Box {...menuBoxStyle}>
            {children}
        </Box>
    ),
    CharMenuBox:({children})=>(
        <Box {...menuBoxStyle}
            position={"absolute"}
            left={0}
        >
            {children}
        </Box>
    ),
}


// function MenuBox({children}) {return (
//     <Box
//         {...{menuBoxStyle}}
//     >
//         {children}
//     </Box>
// )}

// function CharMenuBoxfunction({children}) {return (
//     <Box
//         {...{menuBoxStyle}}

//     >
//         {children}
//     </Box>
// )}