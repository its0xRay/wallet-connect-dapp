import React, { useEffect, useState } from 'react';
import { AuthProvider } from '@arcana/auth';
import './App.css';

const TEST_GIFS = [
	'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
	'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
	'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
	'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
]

const App = () => {
  // State
  //const [walletAddress, setWalletAddress] = useState(null);
  const [arcana, setArcana] = useState(null);
  const [isConnected, setIsConnected] = useState(false);


  // Phantom Auth
  // const checkIfWalletIsConnected = async () => {
  //   if (window?.solana?.isPhantom) {
  //     console.log('Phantom wallet found!');
  //     const response = await window.solana.connect({ onlyIfTrusted: true });
  //     console.log(
  //       'Connected with Public Key:',
  //       response.publicKey.toString()
  //     ); 

      /*
       * Set the user's publicKey in state to be used later!
       */
  //     setWalletAddress(response.publicKey.toString());
  //   } else {
  //     alert('Solana object not found! Get a Phantom Wallet 👻');
  //   }
  // };

  // const connectWallet = async () => {
  //   const { solana } = window;
  
  //   if (solana) {
  //     const response = await solana.connect();
  //     console.log('Connected with Public Key:', response.publicKey.toString());
  //     setWalletAddress(response.publicKey.toString());
  //   }
  // };

  const handleArcanaConnect = async () => {
    if (arcana) {
      try {
        await arcana.connect();
        //setWalletAddress(arcana?.getWalletAddress()?.toString());
      } catch (error) {
        console.error('Error connecting to Arcana:', error.message);
      }
    }
  };


  const renderNotConnectedContainer = () => (
    <div>
      {/* <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect to Wallet
      </button> */}
      <button
        className="cta-button connect-arcana-button"
        onClick={handleArcanaConnect}
      >
        Connect with Arcana
      </button>
    </div>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <div className="gif-grid">
        {TEST_GIFS.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
      <p>Connected with Arcana</p>
    </div>
  );

  useEffect(() => {

    // Initialize Arcana AuthProvider
    const arcanaAuth = new AuthProvider(
      "xar_test_7edd0d684ff2d5826395f0558f366bf7ea57662f",
      {
        // Additional options as needed
      position: 'left', // default: right
      theme: 'light', // default: dark
      alwaysVisible: false, // default: true, wallet always visible
      setWindowProvider: true, // default: false, window.ethereum not set
      connectOptions: {
        compact: true, // default: false, regular plug-and-play login UI
      },

      // chainConfig: {
      //   chainId: '2', // Solana chain ID
      //   rpcUrl: 'https://api.testnet.solana.com', // Solana RPC URL
      // },
    }
    );

    const initAuth = async () => {
      try {
        // logic to check if phanttom wallet is connected
        // if (window?.solana?.isPhantom) {
        //   console.log('Phantom wallet found!');
        //   const response = await window.solana.connect({ onlyIfTrusted: true });
        //   console.log(
        //     'Connected with Public Key:',
        //     response.publicKey.toString()
        //   );
        //   setWalletAddress(response.publicKey.toString());
        // } else {
        //   alert('Solana object not found! Get a Phantom Wallet 👻');
        // }
       
        await arcanaAuth.init();
        setArcana(arcanaAuth);
      } catch (e) {
        console.error('Error initializing Arcana Auth:', e.message);
      }
    };
  
    initAuth();
  }, []);
  

  return (
    <div className="App">
      <div className="container">
			{/* This was solely added for some styling fanciness */}
			{/* <div className={walletAddress || arcana ? 'authed-container' : 'container'}> */}
      <div className={!isConnected ? 'container' : 'authed-container'}>
         <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!isConnected && renderNotConnectedContainer()}
            {isConnected && renderConnectedContainer()}
          {/* Add the condition to show this only if we don't have a wallet address
          {(!walletAddress && !arcana) && renderNotConnectedContainer()}
          {(walletAddress || arcana) && renderConnectedContainer()} */}
        </div>



        {/* <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div> */}


      </div>
    </div>
    </div>
  );
};

export default App;