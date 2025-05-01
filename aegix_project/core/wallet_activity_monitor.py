def monitor_wallets(wallet_data):
    return [wallet for wallet in wallet_data if wallet['tx_count'] > 50]
