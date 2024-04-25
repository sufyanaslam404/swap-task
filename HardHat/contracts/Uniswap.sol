// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUniswapRouter {
    function getAmountsOut(
        uint amountIn,
        address[] memory path
    ) external view returns (uint[] memory amounts);

    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function WETH() external pure returns (address);
}

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);

    function balanceOf(address owner) external view returns (uint256);

    function transfer(address to, uint256 value) external;
}

contract Uniswap {
    address public constant UNISWAP_ROUTER =
        0xD99D1c33F9fC3444f8101754aBC46c52416550D1;

    address public constant USDC =
        0x337610d27c682E347C9cD60BD4b3b107C9d34dDd;
    address public owner;

    event SwappedETHforUSDC(
        address user,
        uint256 ethAmount,
        uint256 usdcAmount
    );
    event SwappedUSDCforETH(
        address user,
        uint256 ethAmount,
        uint256 usdcAmount
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function swapETHtoUSDC(uint256 amountOutMin) external payable {
        address[] memory path = new address[](2);
        path[0] = IUniswapRouter(UNISWAP_ROUTER).WETH();
        path[1] = USDC;

        uint256 deadline = block.timestamp + 360;
        uint256[] memory amounts = IUniswapRouter(UNISWAP_ROUTER)
            .swapExactETHForTokens{value: msg.value}(
            amountOutMin,
            path,
            address(this),
            deadline
        );

        emit SwappedETHforUSDC(msg.sender, msg.value, amounts[1]);

        IERC20(USDC).transfer(msg.sender, amounts[1]);
    }

    function withdrawEth(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner).transfer(amount);
    }

    function getBalance() external view returns (uint256) {
        return IERC20(USDC).balanceOf(address(this));
    }

    function getEthBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdrawTokens(
        address tokenAddress,
        uint256 amount
    ) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance >= amount, "Insufficient balance");

        token.transfer(owner, amount);
    }

    function calculateETHtoUSDC(
        uint256 ethAmount
    ) external view returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = IUniswapRouter(UNISWAP_ROUTER).WETH();
        path[1] = USDC;

        uint256[] memory amounts = IUniswapRouter(UNISWAP_ROUTER).getAmountsOut(
            ethAmount,
            path
        );
        return amounts[1];
    }

    receive() external payable {}
}