renderContact = ({item, isSearchResult}) => {
  const isFriend = isSearchResult
    ? this.state.contacts.find(contact => contact.userId === item.userId) !=
      null
    : true;

  return (
    <SwipeRow
      ref={ref => this.rowRefs.set(item.userId, ref)}
      rightOpenValue={-64}
      style={{height: 67}}>
      <TouchableOpacity
        onPress={() => {
          if (isFriend) {
            this.deleteFriend(item.userId);
          } else {
            this.addFriend(item);
          }
          if (this.rowRefs.has(item.userId)) {
            this.rowRefs.get(item.userId).closeRow();
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 64,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: isFriend ? '#fa7268' : '#28a745',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              color: '#fff',
              fontSize: 14,
            }}>
            {isFriend ? 'Устгах' : 'Нэмэх'}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: colors.bgGray,
          paddingTop: 7,
          paddingBottom: 8,
          paddingHorizontal: 15,
          height: 67,
        }}>
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() =>
            this.props.navigation.navigate('SendPointToContact', {
              contact: item,
              addFriend: () => this.addFriend(item),
              isFriend,
              changeName: (id, name) => {
                const index = this.state.contacts.findIndex(
                  contact => contact.userId === id,
                );
                if (index >= 0) {
                  this.setState({
                    contacts: [
                      ...this.state.contacts.slice(0, index),
                      {
                        ...this.state.contacts[index],
                        contactName: name,
                      },
                      ...this.state.contacts.slice(index + 1),
                    ],
                  });
                }
              },
            })
          }>
          {item.imageUrl != null ? (
            <Image
              source={{uri: item.imageUrl}}
              style={{
                width: 52,
                height: 52,
                resizeMode: 'cover',
                borderRadius: 26,
                marginRight: 15,
              }}
            />
          ) : (
            <Image
              source={require('../image/emptyProfile.jpg')}
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                marginRight: 15,
                resizeMode: 'cover',
              }}
            />
          )}
          <View style={{flex: 1}}>
            {item.contactName ? (
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'RobotoCondensed-Bold',
                  fontSize: 16,
                  lineHeight: 24,
                  color: 'black',
                }}>
                {item.contactName}
              </Text>
            ) : (
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'RobotoCondensed-Bold',
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#e3e3e3',
                }}>
                Хоосон
              </Text>
            )}
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: 12,
                lineHeight: 18,
                color: colors.mutedText,
              }}>
              {item.phone}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SwipeRow>
  );
};
