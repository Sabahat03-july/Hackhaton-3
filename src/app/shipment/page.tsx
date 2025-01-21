'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, Building , User, Package } from 'lucide-react'
import { postReq } from '@/services/shipmentApi'

import JsonResponseViewer from '@/components/JsonResponseViewer'


export default function ShipmentForm() {
  // Carrier and Service
  const [carrierId, setCarrierId] = useState('se-1570529')
  const [serviceCode, setServiceCode] = useState('usps_priority_mail_express')

  // Ship To
  const [shipToName, setShipToName] = useState('')
  const [shipToPhone, setShipToPhone] = useState('')
  const [shipToAddress, setShipToAddress] = useState('')
  const [shipToCity, setShipToCity] = useState('')
  const [shipToState, setShipToState] = useState('')
  const [shipToPostalCode, setShipToPostalCode] = useState('')
  const [shipToCountryCode, setShipToCountryCode] = useState('US')
  const [shipToResidential, setShipToResidential] = useState('yes')

  // Ship From
  const [shipFromName, setShipFromName] = useState('')
  const [shipFromCompany, setShipFromCompany] = useState('')
  const [shipFromPhone, setShipFromPhone] = useState('')
  const [shipFromAddress, setShipFromAddress] = useState('')
  const [shipFromCity, setShipFromCity] = useState('')
  const [shipFromState, setShipFromState] = useState('')
  const [shipFromPostalCode, setShipFromPostalCode] = useState('')
  const [shipFromCountryCode, setShipFromCountryCode] = useState('US')
  const [shipFromResidential, setShipFromResidential] = useState('no')

  // Package
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [length, setLength] = useState(0)

  //alert-dailog
  // const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [shipmentResponse, setShipmentResponse] = useState(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData = {
      to_name: shipToName,
      to_phone: shipToPhone,
      to_address: shipToAddress,
      to_city: shipToCity,
      from_name: shipFromName,
      from_company: shipFromCompany,
      from_phone: shipFromPhone,
      from_address: shipFromAddress,
      from_city: shipFromCity,
      weight_value: weight,
      height,
      width,
      length
    }

    const data = await postReq(submitData)
    setShipmentResponse(data)
    localStorage.setItem("ShipmentData", JSON.stringify(data))

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <Card className="bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="text-blue-500" />
            Shipment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carrier_id">Carrier ID</Label>
              <Input id="carrier_id" value={carrierId} onChange={(e) => setCarrierId(e.target.value)} autoComplete='off' />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service_code">Service Code</Label>
              <Select value={serviceCode} onValueChange={setServiceCode}>
                <SelectTrigger id="service_code">
                  <SelectValue placeholder="Select a service code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usps_priority_mail_express">USPS Priority Mail Express</SelectItem>
                  <SelectItem value="usps_priority_mail">USPS Priority Mail</SelectItem>
                  <SelectItem value="usps_first_class_mail">USPS First Class Mail</SelectItem>
                  <SelectItem value="ups_ground">UPS Ground</SelectItem>
                  <SelectItem value="fedex_ground">FedEx Ground</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="text-green-500" />
            Ship To
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ship_to_name">Name</Label>
              <Input id="ship_to_name" value={shipToName} onChange={(e) => setShipToName(e.target.value)} autoComplete='off' />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ship_to_phone">Phone</Label>
              <Input id="ship_to_phone" value={shipToPhone} onChange={(e) => setShipToPhone(e.target.value)} autoComplete='off' />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ship_to_address">Address</Label>
            <Input id="ship_to_address" value={shipToAddress} onChange={(e) => setShipToAddress(e.target.value)} autoComplete='off'/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ship_to_city">City</Label>
              <Input id="ship_to_city" value={shipToCity} onChange={(e) => setShipToCity(e.target.value)} autoComplete='off'/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ship_to_state">State</Label>
              <Input id="ship_to_state" value={shipToState} onChange={(e) => setShipToState(e.target.value)} autoComplete='off'/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ship_to_postal_code">Postal Code</Label>
              <Input id="ship_to_postal_code" value={shipToPostalCode} onChange={(e) => setShipToPostalCode(e.target.value)} autoComplete='off'/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ship_to_country_code">Country Code</Label>
              <Input id="ship_to_country_code" value={shipToCountryCode} onChange={(e) => setShipToCountryCode(e.target.value)} autoComplete='off'/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ship_to_residential">Residential?</Label>
            <Select value={shipToResidential} onValueChange={setShipToResidential}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="text-yellow-500" />
            Ship From
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ship_from_name">Name</Label>
              <Input id="ship_from_name" value={shipFromName} onChange={(e) => setShipFromName(e.target.value)} autoComplete='off'/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ship_from_company">Company Name</Label>
              <Input id="ship_from_company" value={shipFromCompany} onChange={(e) => setShipFromCompany(e.target.value)} autoComplete='off'/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ship_from_phone">Phone</Label>
            <Input id="ship_from_phone" value={shipFromPhone} onChange={(e) => setShipFromPhone(e.target.value)} autoComplete='off'/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ship_from_address">Address</Label>
            <Input id="ship_from_address" value={shipFromAddress} onChange={(e) => setShipFromAddress(e.target.value)} autoComplete='off'/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ship_from_city">City</Label>
              <Input id="ship_from_city" value={shipFromCity} onChange={(e) => setShipFromCity(e.target.value)} autoComplete='off'/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ship_from_state">State</Label>
              <Input id="ship_from_state" value={shipFromState} onChange={(e) => setShipFromState(e.target.value)} autoComplete='off'/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ship_from_postal_code">Postal Code</Label>
              <Input id="ship_from_postal_code" value={shipFromPostalCode} onChange={(e) => setShipFromPostalCode(e.target.value)} autoComplete='off'/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ship_from_country_code">Country Code</Label>
              <Input id="ship_from_country_code" value={shipFromCountryCode} onChange={(e) => setShipFromCountryCode(e.target.value)} autoComplete='off'/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ship_from_residential">Residential?</Label>
            <Select value={shipFromResidential} onValueChange={setShipFromResidential}>
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="text-purple-500" />
            Package Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (ounce)</Label>
              <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} autoComplete='off'/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (inch)</Label>
              <Input id="height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} autoComplete='off'/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Width (inch)</Label>
              <Input id="width" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} autoComplete='off'/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="length">Length (inch)</Label>
              <Input id="length" type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} autoComplete='off'/>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Submit Shipment</Button>

      {shipmentResponse && <JsonResponseViewer data={shipmentResponse} />}

    </form>
  )
}

