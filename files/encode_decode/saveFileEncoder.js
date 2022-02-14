function hash(string) {

    let hashData = SubtleCrypto.digest("SHA-256", "test");
    print(hashData);

}