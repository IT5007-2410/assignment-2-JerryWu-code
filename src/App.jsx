/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, 
    name: 'Jack', 
    phone: 88885555,
    email: 'Jack@gmail.com',
    meal: 'Veg',
    seatNumber: 1,
    bookingTime: new Date(),
  },
  {
    id: 2, 
    name: 'Rose', 
    phone: 88884444,
    email: 'Rose@gmail.com',
    meal: 'Non-Veg',
    seatNumber: 7,
    bookingTime: new Date(),
  },
];

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { traveller } = props;
  return (
    <tr>
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.email}</td>
      <td>{traveller.seatNumber}</td>
      <td>{traveller.meal}</td>
      <td>{traveller.bookingTime.toString()}</td>
    </tr>
  );
}

function Display(props) {
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const { travellers } = props;
  return (
    <table className="bordered-table">
      <thead>
        <tr>
	        {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Seat Number</th>
          <th>Meal</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers.map((traveller) => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    if (this.props.travellers.length >= 10) {
      alert('No available seats. Cannot add more travellers.');
      return;
    }
    const form = document.forms.addTraveller;
    const seatNumber = parseInt(form.seatnumber.value, 10);
    if (seatNumber < 0 || seatNumber > 9) {
      alert('Seat number must be between 0 and 9.');
      return;
    }
    if (this.props.travellers.some((traveller) => traveller.seatNumber === seatNumber)) {
      alert('Seat number is already occupied. Please choose a different seat.');
      return;
    }
    const newTraveller = {
      id: Math.floor(Math.random() * 1000),
      name: form.travellername.value,
      phone: parseInt(form.travellerphone.value, 10),
      email: form.travelleremail.value,
      seatNumber: seatNumber,
      meal: form.meal.value,
      bookingTime: new Date(),
    };
    this.props.bookTraveller(newTraveller);
    form.reset();
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" required />
        <input type="text" name="travellerphone" placeholder="Phone" required />
        <input type="email" name="travelleremail" placeholder="Email" required />
        <input type="text" name="seatnumber" placeholder="Seat Number (1-10)" required />
        <select name="meal" required>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Veg">Veg</option>
        </select>
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    const travellerId = parseInt(form.travellerid.value, 10);
    if (this.props.travellers.length === 0) {
      alert('No travellers available to delete.');
      return;
    }
    if (this.props.travellers.some((traveller) => traveller.id === travellerId)) {
      this.props.deleteTraveller(travellerId);
    } else {
      alert('Invalid ID. Please enter an existing traveller ID.');
    form.reset();
    }
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellerid" placeholder="Traveller ID" required />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
    const { freeSeats, occupiedSeats } = this.props;
    return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        <h2>Free Seats: {freeSeats}</h2>
          <div className="seating-chart">
            {[...Array(10)].map((_, index) => (
              <button 
                key={index}
                className={this.props.occupiedSeats.includes(index) ? 'occupied-seat' : 'free-seat'}
                style={{ backgroundColor: this.props.occupiedSeats.includes(index) ? 'darkgray' : 'green', color: 'white' }}
              >
                {index}
              </button>
            ))}
          </div>
      </div>
      );
    }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 'homepage' };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(traveller) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    this.setState((prevState) => ({
      travellers: [...prevState.travellers, traveller],
    }));
  }
  
  deleteTraveller(travellerId) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    this.setState((prevState) => ({
      travellers: prevState.travellers.filter((traveller) => traveller.id !== travellerId),
    }));
  }

  render() {
    const { selector, travellers } = this.state;
    const freeSeats = 10 - travellers.length;
    const occupiedSeats = travellers.map((traveller) => traveller.seatNumber);

    return (
      <div>
        <h1>Ticket To Ride</h1>
	      <div className="navbar">
	        {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <button onClick={() => this.setSelector('homepage')}>Homepage</button>
          <button onClick={() => this.setSelector('display')}>Display Travellers</button>
          <button onClick={() => this.setSelector('add')}>Add Traveller</button>
          <button onClick={() => this.setSelector('delete')}>Delete Traveller</button>
	      </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {selector === 'homepage' && <Homepage freeSeats={freeSeats} occupiedSeats={occupiedSeats} />}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {selector === 'display' && <Display travellers={travellers} />}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {selector === 'add' && <Add bookTraveller={this.bookTraveller} travellers={travellers} />}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {selector === 'delete' && <Delete deleteTraveller={this.deleteTraveller} travellers={travellers} />}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
