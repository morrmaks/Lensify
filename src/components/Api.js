import { createClient } from '@supabase/supabase-js';

export default class Api {
  constructor(supabaseUrl, supabaseKey) {
    this._supabase = createClient(supabaseUrl, supabaseKey)
  }

  async _processResponse(res) {
    if (res.error) {
      throw new Error(res.error.message)
    }
    return res.data;
  }

  async _getInitialCards() {
    const res = await this._supabase
      .from('cards')
      .select('*')
      .order('created_at', {ascending: false});
   return this._processResponse(res);
  }

  async _getUserInfo() {
    const res = await this._supabase
      .from('users')
      .select('*');
    return this._processResponse(res);
  }

  async renderUserAndCards() {
    const res = await Promise.all([
      this._getInitialCards(),
      this._getUserInfo()
    ]);
    return res;
  }

  async addCard(data, userId) {
    const res = await this._supabase
      .from('cards')
      .insert([
        {
          name: data.title,
          link: data.link,
          owner_id: userId
        }
      ])
      .select();
    return this._processResponse(res);
  }

  async editCard(data, card) {
    const res = await this._supabase
      .from('cards')
      .update({
        name: data.title,
      })
      .eq('id', card.id)
      .select();
    return this._processResponse(res);
  }

  async deleteCard(card) {
    const res = await this._supabase
      .from('cards')
      .delete()
      .eq('id', card.id);
    return this._processResponse(res);
  }

  async setUserInfo(info, userId) {
    const res = await this._supabase
      .from('users')
      .update({
          name: info.name,
          bio: info.bio
      })
      .eq('id', userId)
      .select();
    return this._processResponse(res);
  }

  async setUserAvatar(info, userId) {
    const res = await this._supabase
      .from('users')
      .update({
          avatar: info.avatar
      })
      .eq('id', userId)
      .select();
    return this._processResponse(res);
  }

  async getLikesForCard(card) {
    const res = await this._supabase
      .from('likes')
      .select('user_id')
      .eq('card_id', card.id);
    return this._processResponse(res);
  }

  async setLike(card, userObject) {
    const res = await this._supabase
      .from('likes')
      .insert([
        {
          card_id: card.id,
          user_id: userObject.id
        }
      ])
      .select();
    return this._processResponse(res);
  }

  async deleteLike(card, userObject) {
    const res = await this._supabase
      .from('likes')
      .delete()
      .match({
        card_id: card.id,
        user_id: userObject.id
      });
    return this._processResponse(res);
  }
}

