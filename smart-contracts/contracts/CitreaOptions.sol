// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CitreaOptions {
    struct Option {
        uint256 strikePrice;
        uint256 premium;
        uint256 expiry;
        bool isCall;
        uint256 liquidity;
    }

    mapping(uint256 => Option) public options;
    uint256 public optionCount;

    event OptionCreated(uint256 optionId, uint256 strikePrice, uint256 premium, uint256 expiry, bool isCall, uint256 liquidity);

    function createOption(uint256 _strikePrice, uint256 _premium, uint256 _expiry, bool _isCall, uint256 _liquidity) public {
        optionCount++;
        options[optionCount] = Option(_strikePrice, _premium, _expiry, _isCall, _liquidity);
        emit OptionCreated(optionCount, _strikePrice, _premium, _expiry, _isCall, _liquidity);
    }

    function getOption(uint256 _optionId) public view returns (uint256, uint256, uint256, bool, uint256) {
        Option memory option = options[_optionId];
        return (option.strikePrice, option.premium, option.expiry, option.isCall, option.liquidity);
    }
}