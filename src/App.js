import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

// Replace your code here
class App extends Component {
  state = {guideData: [], dataStatus: 'initial'}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({dataStatus: 'loading'})
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()

    const formattedData = data.packages.map(i => ({
      description: i.description,
      id: i.id,
      imageUrl: i.image_url,
      name: i.name,
    }))
    console.log(formattedData)
    this.setState({dataStatus: 'success', guideData: formattedData})
  }

  renderGuideView = () => {
    const {guideData} = this.state

    return (
      <div>
        <ul>
          {guideData.map(k => (
            <li key={k.id}>
              <div>
                <img src={k.imageUrl} alt={k.name} />
                <h1>{k.name}</h1>
                <p>{k.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderGuide = () => {
    const {dataStatus} = this.state

    switch (dataStatus) {
      case 'success':
        return this.renderGuideView()

      case 'loading':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1>Travel Guide</h1>
        {this.renderGuide()}
      </div>
    )
  }
}

export default App
