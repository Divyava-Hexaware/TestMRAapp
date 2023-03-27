import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editCosmetics } from './store/Cosmetics.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

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

const EditCosmetics = () => {
    const { id: CosmeticsId } = useParams()

    const Cosmetics = useSelector((state) =>
        state.Cosmetics.entities.find(
            (Cosmetics) => Cosmetics.id.toString() === CosmeticsId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [productname, setProductname] = useState(Cosmetics.productname)
    const [description, setDescription] = useState(Cosmetics.description)
    const [price, setPrice] = useState(Cosmetics.price)
    const [offer, setOffer] = useState(Cosmetics.offer)
    const [availability, setAvailability] = useState(Cosmetics.availability)
    const [deliverydate, setDeliverydate] = useState(Cosmetics.deliverydate)
    const [daystodeliver, setDaystodeliver] = useState(Cosmetics.daystodeliver)
    const [offerprice, setOfferprice] = useState(Cosmetics.offerprice)

    const handleProductname = (e) => setProductname(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handlePrice = (e) => setPrice(parseInt(e.target.value))
    const handleOffer = (e) => setOffer(e.target.value)
    const handleAvailability = (e) => setAvailability(parseInt(e.target.value))
    const handleDeliverydate = (e) => setDeliverydate(e.target.value)
    const handleDaystodeliver = (e) =>
        setDaystodeliver(parseInt(e.target.value))
    const handleOfferprice = (e) => setOfferprice(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editCosmetics({
                id: CosmeticsId,
                productname,
                description,
                price,
                offer,
                availability,
                deliverydate,
                daystodeliver,
                offerprice,
            })
        )
        navigate('/Cosmetics')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditCosmetics', path: '/Cosmetics' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="productname"
                                id="productnameInput"
                                onChange={handleProductname}
                                value={productname}
                                validators={['required']}
                                label="Productname"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="description"
                                id="descriptionInput"
                                onChange={handleDescription}
                                value={description}
                                validators={['required']}
                                label="Description"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="price"
                                id="priceInput"
                                onChange={handlePrice}
                                value={price || ''}
                                validators={['required']}
                                label="Price"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={offer}
                                onChange={handleOffer}
                                select
                                id="offerInput"
                                label="Offer"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>
                            <TextField
                                type="number"
                                name="availability"
                                id="availabilityInput"
                                onChange={handleAvailability}
                                value={availability || ''}
                                validators={['required']}
                                label="Availability"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="date"
                                name="deliverydate"
                                id="deliverydateInput"
                                onChange={handleDeliverydate}
                                value={deliverydate}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="daystodeliver"
                                id="daystodeliverInput"
                                onChange={handleDaystodeliver}
                                value={daystodeliver || ''}
                                validators={['required']}
                                label="Daystodeliver"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="offerprice"
                                id="offerpriceInput"
                                onChange={handleOfferprice}
                                value={offerprice || ''}
                                validators={['required']}
                                label="Offerprice"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditCosmetics
