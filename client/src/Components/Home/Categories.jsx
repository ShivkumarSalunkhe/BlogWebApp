import {styled, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../constants/Data'

const StyledTable = styled(Table)`
    border: 1px solid rgba(224,224,224,1);

`


const StyledButton = styled(Button)`
    margin:20px;
    width:85%;
`
const Categories = () => {
    return (
        <>
        <Link to={'/create'} style={{textDecoration:'none'}}>
        <StyledButton variant='contained'>Create Blog</StyledButton>
        </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            All Categories
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow>
                                <TableCell key={category.id}>
                                {category.type}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories
