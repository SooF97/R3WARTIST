// SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;

/*
@title Prompts Smart Contract
@author Soufiane MASAD | https://soufn.com | https://oklever.com
@notice This contract allows artists to register their ai-generative prompts leveraging blockchain technology
@notice Users should pay a price to the artist in order to benefit from the already-proved ai-gen prompt
@dev This contract implements Chainlink Verifiable Random Function and Chainlink Data Feeds 
*/

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract Prompts is VRFConsumerBaseV2Plus {
    AggregatorV3Interface internal dataFeed;

    /* CONSTANT VARIABLES */
    uint16 private constant requestConfirmations = 3;
    uint32 private constant numWords = 1;

    /* STORAGE VARIABLES */
    uint256 private s_randomNumberGenerated;
    address public s_contractOwner;
    uint256 private s_subscriptionId =
        44093515583056640969191475247853284249830484101019387866061058522513777347172;
    artist[] public artistsArray;
    uint256 public id;

    /* IMMUTABLE VARIABLES */
    address private immutable vrfCoordinator =
        0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B; // SEPOLIA NETWORK
    bytes32 private immutable s_keyHash =
        0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae; // SEPLOIA keyHash => 750 Gwei
    uint32 private immutable callbackGasLimit = 40000;
    address private immutable sepoliaDataFeedAddress =
        0x694AA1769357215DE4FAC081bf1f309aDC325306;

    /* ARTIST DATA */
    struct artist {
        address payable artistAddress;
        uint256 artistId;
        string[] artistPrompts;
        string[] artistPreviousWork;
        uint256 price;
        bool registred;
        uint256 numberOfBuyers;
    }

    /* USER DATA */
    struct user {
        address userAddress;
        uint256[] artistsIds;
    }

    /* MAPPINGS */
    mapping(uint256 => artist) public artistMapping;
    mapping(address => user) public userMapping;
    mapping(address => mapping(uint256 => bool) artistIdToSubscribed)
        public isSubscribed;
    mapping(address => bool) public isArtistAlreadyRegistred;

    /* FUNCTIONS */
    constructor() VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_contractOwner = msg.sender;
        dataFeed = AggregatorV3Interface(sepoliaDataFeedAddress);
    }

    /* ARTIST TO REGISTER THEIR PROMPT ONCE A TIME */
    function registerPrompts(
        string[] memory _prompts,
        string[] memory _previousWorks,
        uint256 _price
    ) external {
        require(_prompts.length != 0, "You should add some prompts!");
        require(
            isArtistAlreadyRegistred[msg.sender] == false,
            "You already registred!"
        );
        id = generateRandomNumber() % 10000;
        for (uint i = 0; i < _prompts.length; i++) {
            artistMapping[id].artistPrompts.push(_prompts[i]);
        }
        for (uint j = 0; j < _previousWorks.length; j++) {
            artistMapping[id].artistPreviousWork.push(_previousWorks[j]);
        }
        artistMapping[id].artistAddress = payable(msg.sender);
        artistMapping[id].artistId = id;
        artistMapping[id].price = _price;
        artistMapping[id].registred = true;
        artistsArray.push(artistMapping[id]);
        isArtistAlreadyRegistred[msg.sender] = true;
    }

    /* USER TO BUY A SELECTED ARTIST THROUGH HIS ID */
    function buyPrompt(uint256 _artistId) public payable {
        require(
            msg.value >= artistMapping[_artistId].price,
            "Pay the exact amount to purchase the prompt!"
        );
        isSubscribed[msg.sender][_artistId] = true;
        userMapping[msg.sender].userAddress = msg.sender;
        userMapping[msg.sender].artistsIds.push(_artistId);
        artistMapping[_artistId].numberOfBuyers++;
        (bool sent, ) = artistMapping[_artistId].artistAddress.call{
            value: msg.value
        }("");
        require(sent, "Failed to send Ether");
    }

    /* GET ARTIST DATA */
    function getArtist(uint256 _artistId) public view returns (artist memory) {
        return artistMapping[_artistId];
    }

    /* FETCH ARTISTS */
    function getAllArtists() public view returns (artist[] memory) {
        artist[] memory finalResult = new artist[](artistsArray.length);
        uint256 index;
        for (uint i = 0; i < artistsArray.length; i++) {
            finalResult[index] = artistsArray[i];
            index++;
        }
        return finalResult;
    }

    /* FETCH USER BOUGHT PROMPTS */
    function fetchUserPrompts() public view returns (string[] memory) {
        uint256 userToArtistsLength = userMapping[msg.sender].artistsIds.length;
        uint256 counter;
        uint256 index;
        for (uint i = 0; i < userToArtistsLength; i++) {
            counter =
                counter +
                artistMapping[userMapping[msg.sender].artistsIds[i]]
                    .artistPrompts
                    .length;
        }
        string[] memory finalUserPrompt = new string[](counter);
        for (uint i = 0; i < userToArtistsLength; i++) {
            for (
                uint j = 0;
                j <
                artistMapping[userMapping[msg.sender].artistsIds[i]]
                    .artistPrompts
                    .length;
                j++
            ) {
                finalUserPrompt[index] = artistMapping[
                    userMapping[msg.sender].artistsIds[i]
                ].artistPrompts[j];
                index++;
            }
        }
        return finalUserPrompt;
    }

    /* CHAINLINK VRF TO GENERATE A RANDOM NUMBER TO BE USED FOR RANDOM ARTITS IDs*/
    function generateRandomNumber() internal returns (uint256) {
        uint256 randomNum = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                // Set nativePayment to true to pay for VRF requests with Sepolia ETH instead of LINK
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );
        uint256[] memory _randomNumArray = new uint256[](1);
        _randomNumArray[0] = randomNum;
        fulfillRandomWords(randomNum, _randomNumArray);
        return randomNum;
    }

    function fulfillRandomWords(
        uint256,
        uint256[] memory randomWords
    ) internal override {
        s_randomNumberGenerated = randomWords[0];
    }

    /* GET THE PRICE FEED FOR ETH/USD ON THE SEPOLIA NETWORK*/
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }

    function priceToUsd(uint256 _price) public view returns (uint256) {
        uint256 ethInUsd = uint256(getChainlinkDataFeedLatestAnswer());
        uint256 result = ethInUsd / 100000000;
        return uint256(_price * result);
    }
}
