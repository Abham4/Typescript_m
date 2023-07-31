import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'

const Addresses = ({address}:any) => {
    // console.log(address)
  return (
    <>
        {
            address instanceof Array ?
            address.map((ad:any)=>(
                <Card className='basis-1/2 ' >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Address
                    </Typography>
                      <div className="flex flex-row">
                        <div className="basis-3/5">
                          <div className="flex flex-col">
                            Address Type
                          </div>
                          <div className="flex flex-col">
                            Addess Line 1
                          </div>
                          <div className="flex flex-col">
                          Addess Line 2
                          </div>
                          <div className="flex flex-col">
                          Addess Line 3
                          </div>
                          <div className="flex flex-col">
                          Phone  Number
                          </div>
                          <div className="flex flex-col">
                          City
                          </div>
                          <div className="flex flex-col">
                          State
                          </div>
                          <div className="flex flex-col">
                          Country
                          </div>
                        </div>
                        <div className="basis-2/5">
                          <div className="flex flex-col">
                              {ad.addressType.length !== 0?
                                ad.addressType:<span>---------</span>  }
                            </div>
                            <div className="flex flex-col">
                              {ad.addressLine1.length !== 0?
                                ad.addressLine1:<span>---------</span>}
                            </div>
                            <div className="flex flex-col">
                              {ad.addressLine2.length !== 0?
                                ad.addressLine2:<span>---------</span>}
                            </div>
                            <div className="flex flex-col">
                              {ad.addressLine3.length !== 0?
                                ad.addressLine3:<span>---------</span>}
                            </div>
                            <div className="flex flex-col">
                              {ad.phoneNumber.length !== 0?
                                ad.phoneNumber:<span>---------</span>}
                            </div>
                            <div className="flex flex-col">
                              {ad.city.length !== 0?
                                ad.city:<span>---------</span>}
                            </div>
                            <div className="flex flex-col">
                              {ad.stateProvince.length !== 0?
                                ad.stateProvince:<span>---------</span>}
                            </div>
                            <div className="flex flex-col">
                              {ad.country.length !== 0?
                                ad.country:<span>---------</span>}
                            </div>
                        </div>
                      </div>
                  </CardContent>
                </CardActionArea>
              </Card>
              )):
              <></> 
            
            }
    </>
  )
}

export default Addresses