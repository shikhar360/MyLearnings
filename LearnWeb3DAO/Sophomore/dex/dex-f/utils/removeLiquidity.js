import { Contract, providers, utils, BigNumber } from "ethers";
import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS } from "../constants";

export const removeLiquidity = async (signer, removeLPTokensWei) => {
  // Create a new instance of the exchange contract
  const exchangeContract = new Contract(
    EXCHANGE_CONTRACT_ADDRESS,
    EXCHANGE_CONTRACT_ABI,
    signer
  );
  const tx = await exchangeContract.removeLiquidity(removeLPTokensWei);
  await tx.wait();
};

export const getTokensAfterRemove = async (
  provider,
  removeLPTokenWei,
  _ethBalance,
  cryptoDevTokenReserve
) => {
  try {
    // Create a new instance of the exchange contract
    const exchangeContract = new Contract(
      EXCHANGE_CONTRACT_ADDRESS,
      EXCHANGE_CONTRACT_ABI,
      provider
    );
    // Get the total supply of `Crypto Dev` LP tokens
    const _totalSupply = await exchangeContract.totalSupply();

    const _removeEther = _ethBalance.mul(removeLPTokenWei).div(_totalSupply);
    const _removeCD = cryptoDevTokenReserve
      .mul(removeLPTokenWei)
      .div(_totalSupply);
    return {
      _removeEther,
      _removeCD,
    };
  } catch (err) {
    console.error(err);
  }
};
