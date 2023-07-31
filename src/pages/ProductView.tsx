
import React from 'react'
import './but.css';
const ProductView = () => {
  
  return (
    
    <div className="reskin-body-view">
    <div className="ng-scope" ng-view>
    <h1 className='bold'>Products</h1>
      <div className="content-container ng-scope">
        <div className="card">
          
          <div className="content">
            <div className="toolbar"><h4></h4></div>
          </div>
          <div className="row">
         
          <div className="col-md-6 col">
          <div className="list-group">
          
         
         
          <a className="list-group-item hover:bg-[#ffbb00] hover:text-[#ffbb00]" href="/Products/Saving" has-permission="CREATE_JOURNALENTRY">
          <h4 className="list-group-item-heading ng-binding">
          <i className="fa fa-repeat fa fa-large">
          </i>
          <div className="tool "><h4>Saving Products</h4></div>
            </h4>
            <p className="list-group-item-text ng-binding">Add new saving product or modify saving product </p>
          </a>
          <div className="toolbar"></div>
          <a className="list-group-item hover:bg-[#ffbb00] hover:text-[#ffbb00]" href="/Products/Sharing" has-permission="CREATE_JOURNALENTRY">
            <h4 className="list-group-item-heading ng-binding">
              <i className="fa fa-repeat fa fa-large">
              </i>
              <div className="tool"><h4>Share product</h4></div>
            </h4>
            <p className="list-group-item-text ng-binding">Add new share product or share product</p>
          </a>
          <div className="toolbar"></div>
          <a className="list-group-item hover:bg-[#ffbb00] hover:text-[#ffbb00]" href="/Products/Loan" has-permission="CREATE_JOURNALENTRY">
          <h4 className="list-group-item-heading ng-binding">
          <div className="tool"><h4>Loan products</h4></div>
          <i className="fa fa-repeat fa fa-large">
          </i>
            </h4>
            <p className="list-group-item-text ng-binding">Add new loan product or modify or loan product</p>
          </a>
          <div className="toolbar"></div>
          <a className="list-group-item hover:bg-[#ffbb00] hover:text-[#ffbb00]" href="/viewsharing" has-permission="CREATE_JOURNALENTRY">
          <h4 className="list-group-item-heading ng-binding">
          <i className="fa fa-repeat fa fa-large">
          </i>
          <div className="tool"><h4>Charges</h4></div>
            </h4>
            <p className="list-group-item-text ng-binding">Define charges</p>
          </a>
          <div className="toolbar"></div>
          <a className="list-group-item hover:bg-[#ffbb00] hover:text-[#ffbb00]" href="#/freqposting" has-permission="CREATE_JOURNALENTRY">
          <h4 className="list-group-item-heading ng-binding">
          <i className="fa fa-repeat fa fa-large">
          </i>
          <div className="tool"><h4>Products Mix</h4></div>
            </h4>
            <p className="list-group-item-text ng-binding">Defines rules for taking multiple rules</p>
          </a>
          </div>
          </div>
          <div className="toolbar"></div>
          <div className="col-sm-6 col-md-6">
           <div className="list-group">
           <a className="list-group-item hover:bg-[#ffbb00] hover:text-[#ffbb00]" href="#/freqposting" has-permission="CREATE_JOURNALENTRY">
           <h4 className="list-group-item-heading ng-binding"> 
           <i className="fa fa-repeat fa fa-sitemap">
          </i>
          <div className="tool"><h4>Fixed Deposit Products</h4></div>
           </h4>
           <p className="list-group-item-text ng-binding">Add modify  Fixed deposit product</p> 
           </a>
           <div className="toolbar"></div>
          <a className="list-group-item hover:bg-[#ffbb00] hover:text-[#ffbb00]" href="#/freqposting" has-permission="CREATE_JOURNALENTRY">
          <h4 className="list-group-item-heading ng-binding">
          <i className="fa fa-repeat fa fa-large">
          </i>
          <div className="tool"><h4>Recurring Deposit Products</h4></div>
            </h4>
            <p className="list-group-item-text ng-binding">Add Modify Recurring Deposit Products </p>
          </a>
          <div className="toolbar"></div>
          <a className="list-group-item hover:bg-[#ffbb00] hover:text-[#ffbb00]" href="#/freqposting" has-permission="CREATE_JOURNALENTRY">
          <h4 className="list-group-item-heading ng-binding">
          <i className="fa fa-repeat fa fa-large">
          </i>
          <div className="tool"><h4>Floating Rates</h4></div>
            </h4>
            <p className="list-group-item-text ng-binding">Define Tax components and Tax groups</p>
          </a>
         
          

           </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProductView

