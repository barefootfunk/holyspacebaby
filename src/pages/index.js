import React from 'react';
import {Helmet} from "react-helmet";
import VideoBg from "../components/props/VideoBg";
import MailingList from "../components/props/MailingList";
import $ from 'jquery';
import HolySpaceBabySvg from "../svg/holy-space-baby.inline.svg"

// Styles
import '../styles/App.scss';

class App extends React.Component {

  componentDidMount() {
    window.location.href = 'https://cowboyelijah.com';
  //   const eventbriteApiToken="CF3QVTIL3QGFLOPRFJKB"

  //   const ceremonies = [
  //     {
  //       number: 18,
  //       theme: 'Contagious',
  //       eventbriteIds: ["136060730307"]
  //     }
  //   ]

  //   function renderTicketListings() {
  //     $(`#ticket-listings`).empty();
      
  //     ceremonies.forEach(ceremony => {
  //         $(`#ticket-listings`).append(`
  //         <div id="ceremony-${ceremony.number}" class="ticket-listings__show">
  //           <ul></ul>
  //         </div>
  //       `); 
  //       ceremony.eventbriteIds.forEach(eventbriteId => {

  //         $.ajax({
  //           "async": true,
  //           "crossDomain": true,
  //           "url": `https://www.eventbriteapi.com/v3/events/${eventbriteId}/?expand=ticket_classes`,
  //           "method": "GET",
  //           "headers": {
  //             "Authorization": `Bearer ${eventbriteApiToken}`,
  //             "Content-Type": "application/json"
  //           }
  //         }).done(function (eventData) {

  //           var startDate = new Date(eventData.start.utc);
  //           const dateString = new Intl.DateTimeFormat('en', { 
  //             month: 'short',
  //             weekday: 'long',
  //             day: '2-digit',
  //           }).format(startDate);
  //           const timeString = new Intl.DateTimeFormat('en', { 
  //             hour: 'numeric',
  //             timeZoneName: 'short', 
  //           }).format(startDate);

  //           const tickets = eventData.ticket_classes[0];
  //           const avail = tickets.quantity_total-tickets.quantity_sold;
  //           const total = tickets.quantity_total;

  //           $(`#ticket-listings #ceremony-${ceremony.number} ul`).append(`
  //             <li class="ticket-listings__showtime">
  //               <p>
  //                 ${dateString}<br>
  //                 ${timeString}<br>
  //                 Free to all, RSVP required
  //               </p>
  //               <p class="ticket-listings__showtime__availability"><span>${avail} of ${total}</span> spots remaining</p>
  //               <button class="button ${avail ? '' : 'button--disabled'}" id="eventbrite-checkout-${eventbriteId}">${avail ? 'Reserve your spot' : 'TOTZ FULL UP'}</button>
  //             </li>
  //           `); 

  //           window.EBWidgets.createWidget({
  //             widgetType: "checkout",
  //             eventId: eventbriteId,
  //             modal: true,
  //             modalTriggerElementId: `eventbrite-checkout-${eventbriteId}`,
  //             onOrderComplete: renderTicketListings
  //           });
  //         });
  //       });
  //     });
  //   }

  //   // renderTicketListings();

  }
  render () {

    return (
      <div id="app" className="homepage">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Redirecting...</title>
          <script src="https://www.eventbrite.com/static/widgets/eb_widgets.js"></script>
        </Helmet>
        <h1>Redirecting to <a href="https://cowboyelijah.com">cowboyelijah.com</a></h1>
        {/* <VideoBg key='campfire' srcs={['campfire.mp4']}/>
        <div className="homepage__content-block homepage__content-block--description">
          <h1>HolySpaceBaby</h1>
          <p>The world's first interactive electric trombone livestream adventure.</p>
        </div>
        {/* <div className="homepage__content-block homepage__content-block--tickets">
          <h2>Ceremonies</h2>
          <div id="ticket-listings" />
        </div> */}        
        {/* <div className="homepage__content-block homepage__content-block--description">
          <h2>Ceremonies resume soon!</h2>
          <p>Cowboy Elijah is quarantining at an alpaca farm with shaky internet.  He had planned to continue ceremonies during this stay. But, after days of testing, the connection just isn't good enough to safely reincarnate others.  Safety first.</p>
        </div>        
        <div className="homepage__content-block homepage__content-block--description">
          <h2>Get word when we return!</h2>
          <MailingList/>
          <p>Also, hear about Cowboy Elijah's blog...</p>
        </div>
        <div id="decorative-baby">
          <HolySpaceBabySvg />
        </div> */}
      </div>
    );
  }
}

export default App;