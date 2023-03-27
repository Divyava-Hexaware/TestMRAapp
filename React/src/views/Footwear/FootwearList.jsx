import React, { useEffect } from 'react'
import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteFootwear, fetchFootwear } from './store/Footwear.action'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import { CircularProgress, IconButton } from '@mui/material'
import { Button, Icon } from '@mui/material'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const FootwearList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { entities } = useSelector((state) => state.Footwear)
    const loading = useSelector((state) => state.Footwear.loading)

    const handleDelete = (id) => {
        dispatch(deleteFootwear({ id }))
    }

    const handleEdit = (id) => {
        navigate(`/Footwear/edit/${id}`)
    }

    const handleAdd = () => {
        navigate(`/Footwear/add`)
    }

    useEffect(() => {
        dispatch(fetchFootwear())
    }, [dispatch])

    const rows = entities.map((entity, idCounter) => {
        idCounter += 1
        return { id: idCounter, ...entity }
    })

    const columns = [
        { field: 'productname', headerName: 'Productname', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        { field: 'offer', headerName: 'Offer', width: 200 },
        { field: 'availability', headerName: 'Availability', width: 200 },
        { field: 'deliverydate', headerName: 'Deliverydate', width: 200 },
        { field: 'daystodeliver', headerName: 'Daystodeliver', width: 200 },
        { field: 'offerprice', headerName: 'Offerprice', width: 200 },
        {
            field: 'Actions',
            width: 200,
            renderCell: (cellValues) => {
                return (
                    <>
                        <IconButton
                            onClick={() => {
                                handleEdit(cellValues.row.id)
                            }}
                            aria-label="Example"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                handleDelete(cellValues.row.id)
                            }}
                            aria-label="Example"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            },
        },
    ]
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Entities', path: '/Footwear' },
                        { name: 'Footwear' },
                    ]}
                />
            </div>

            <Button
                onClick={() => {
                    handleAdd()
                }}
                color="primary"
                variant="contained"
            >
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                    Add Footwear
                </Span>
            </Button>

            <SimpleCard title="Footwear">
                {loading ? (
                    <div
                        title="loading"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <CircularProgress className="progress" />
                    </div>
                ) : (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>
                )}
            </SimpleCard>
        </Container>
    )
}

export default FootwearList
