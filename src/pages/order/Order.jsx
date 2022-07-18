import { Skeleton } from "@mui/material"
import { getCountries } from "../utils.js"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { publicRequest, userRequest } from "../../requestMethods"
import styled from "styled-components"
import { updateOrder } from "../../redux/apiCalls.js"
import './order.css'

const Container = styled.div`
  display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 20px;
    width: 80%;
`
const OrderContainer = styled.div`
  flex: 4;
  max-width: 100vw;
  background-color: #fff;
  padding: 20px;
`
const LeftTitle = styled.h2`
  color: #BF4124;`
const ProductContainer = styled.div`
  margin: 18px 0; // doit etre enlever
`

const ProductRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2dcdc;
`
const RowItemContainer = styled.div`
  display: flex;
  align-items: center;
`
const RowItem = styled.h3`
  padding: 5px;
  color: #59302D;
`

const AddressContainer = styled.div``
const AddressRow = styled.h3`
  font-style: italic;
  color: #59302D;
  &:first-of-type {
    margin-top: 18px;
  }
`
const ColorContainer = styled.div`
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid rgba(59, 75, 147, 0.8);
  background-color: ${(props) => props.color};
`
const Select = styled.div`
padding: 10px;
`
export default function Order() {


  const [data, setData] = useState({
    stripeData: {
      billing_details: { address: {}, name: "", email: "", phone: "" },
      payment_method_details: { card: {} },
      created: 0
    },
    ordersData: { _id: "", amount: 0, products: [], shippingPrice: 0 }
  })
  // @ts-ignore
  const { _id: userId } = useSelector((state) => state.user.currentUser)
  const location = useLocation()
  const [,,orderId] = useLocation().pathname.split("/")
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const productsSkeleton = useRef(
    [...Array(location.state?.productsLength)].map((_, idx) => (
      <Skeleton key={idx} width="100%" height={34} />
    ))
  )
  const addressSkeleton = useRef(
    [...Array(5)].map(() => <Skeleton width="100%" height={23} />)
  )
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    if (isMounted.current) {
      ;(async () => {
        try {
          const { data: ordersData } = await userRequest.get(
            `orders/find/${userId}/${orderId}`
          )

          if (ordersData.userId !== userId) {
            history.push("/")
          } else if (ordersData?.stripeId) {
            const { data: stripeData } = await publicRequest.get(
              `/checkout/payment/intents/${ordersData.stripeId}`
            )
            setData({ stripeData: stripeData.charges.data[0], ordersData })
          } else {
            const { data: stripeData } =
              await publicRequest.get(`/paypal/payment/${ordersData?.paypalId}
          `)
          
            setData({ stripeData, ordersData })
          }
          setLoading(false)
        } catch (err) {
          console.error("Error while fetching order in Order", err)
        }
        
      })()
      
    }
    
    return () => {
      isMounted.current = false
    }
  }, [orderId, userId])

  const {
    stripeData: {
      billing_details: { address, name, email, phone },
      payment_method_details: { card }
    },
    ordersData: { amount, products, shippingPrice, status }
  } = data
  console.log()
  const order = useSelector(state => state.order.orders.find(
    ({ _id }) => _id === orderId
))
const dispatch = useDispatch()
const onUpdate = (e) => {
    const { status,trackingNumber } = data.ordersData
    if(status !== order.status && trackingNumber !== order.trackingNumber )
    updateOrder(dispatch,{status,trackingNumber}, orderId)
    else if(status !== order.status)
    updateOrder(dispatch,{status}, orderId)
    else if(trackingNumber !== order.trackingNumber)
    updateOrder(dispatch,{trackingNumber}, orderId)
  }
  const handleUpdate = ({target}) => {
    const { value,name } = target
        setData({...data, ordersData : {...data.ordersData,[name]: value} })
  }
  return (
    <Container>

      <OrderContainer>
        <LeftTitle>{("ORDER DETAILS")}</LeftTitle>
        <ProductContainer>
          <ProductRow>
            <RowItem>{("PRODUCT ORDERED")}</RowItem>
            <RowItem>{("TOTAL")}</RowItem>
          </ProductRow>
          {(loading && productsSkeleton.current) ||
            products?.map(
              ({ productId: product, color, size, quantity, _id: pId }) => (
                // eslint-disable-next-line no-underscore-dangle
                <ProductRow key={pId}>
                  <RowItemContainer>
                    <RowItem isName>
                      {product.title} {` x${quantity}`} {"-" && size}
                    </RowItem>
                    <ColorContainer color={color} />
                  </RowItemContainer>
                  <RowItem>
                    {("₱")}
                    {quantity * product.price}
                  </RowItem>
                </ProductRow>
              )
            )}
          <ProductRow>
            <RowItem>{("SUBTOTAL")}</RowItem>
            <RowItem>{("₱") + amount }</RowItem>
          </ProductRow>
          <ProductRow>
            <RowItem>{("PAYMENT METHOD")}</RowItem>
            <RowItem>{card.brand}</RowItem>
          </ProductRow>
          <ProductRow>
            <RowItem>{("SHIPPING FEE")}</RowItem>
            <RowItem>{ ("₱")+ shippingPrice }</RowItem>
          </ProductRow>
          <ProductRow>
            <RowItem>{("TOTAL")}</RowItem>
            <RowItem>{ ("₱") + amount + shippingPrice }</RowItem>
          </ProductRow>
          <ProductRow>
            <RowItem>{("ORDER ID")}</RowItem>
            <RowItem>{orderId}</RowItem>
          </ProductRow>
          <ProductRow>
            <RowItem>{("STATUS")}</RowItem>
            <select value={status} className ="stat" name="status" onChange={handleUpdate} >
              <option value="pending">Pending</option>
              <option value="proccessing">Processing</option>
              <option value="send">Dispatched</option>
            </select>
          </ProductRow>
        </ProductContainer>
        
        <AddressContainer>
          <LeftTitle>{("BILLING ADDRESS")}</LeftTitle>
          {loading ? (
            addressSkeleton.current
          ) : (
            <>
              <AddressRow>{name}</AddressRow>
              <AddressRow>{address.line1}</AddressRow>
              <AddressRow>{`${address.postal_code}, ${address.city}, ${
                getCountries({
                  code: address.country,
                  country: false
                })?.country
              }`}</AddressRow>
              <AddressRow>{email}</AddressRow>
              {phone ? <AddressRow>{phone}</AddressRow> : null}
            </>
          )}
          <button onClick={onUpdate} className="update">Update</button>
        </AddressContainer>
      </OrderContainer>
    </Container>
  )
}
